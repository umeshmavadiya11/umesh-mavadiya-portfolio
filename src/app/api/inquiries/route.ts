import { createHash } from "node:crypto";
import { and, eq, lt, sql } from "drizzle-orm";
import { db } from "@/db";
import { contactRateLimits, inquiries } from "@/db/schema";
import { cleanText, validateInquiry, type InquiryInput } from "@/lib/contact";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: object, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}
function reference(id: string) { return `UM-${id.slice(0, 8).toUpperCase()}`; }

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "Please submit the inquiry as JSON." }, 415);
  if (request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "This request could not be verified. Please use the contact form." }, 403);
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const originHost = new URL(origin).host;
      const allowedHosts = [new URL(request.url).host, request.headers.get("host"), request.headers.get("x-forwarded-host")?.split(",")[0].trim(), new URL(site.url).host];
      if (!allowedHosts.includes(originHost)) return json({ error: "This request could not be verified. Please use the contact form." }, 403);
    } catch { return json({ error: "Invalid request origin." }, 403); }
  }
  if (Number(request.headers.get("content-length") || 0) > 15000) return json({ error: "The message is too long. Please keep it under 5,000 characters." }, 413);

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 15000) return json({ error: "The message is too long. Please keep it under 5,000 characters." }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "Please check the form and try again." }, 400);
    body = parsed as Record<string, unknown>;
  } catch { return json({ error: "The form could not be read. Please try again." }, 400); }

  const data: InquiryInput = {
    name: typeof body.name === "string" ? cleanText(body.name) : "",
    email: typeof body.email === "string" ? body.email.trim().toLowerCase() : "",
    projectType: typeof body.projectType === "string" ? body.projectType : "",
    budget: typeof body.budget === "string" ? body.budget : "",
    message: typeof body.message === "string" ? cleanText(body.message) : "",
    consent: body.consent === true,
    website: typeof body.website === "string" ? body.website : "",
    startedAt: typeof body.startedAt === "number" ? body.startedAt : 0,
    source: typeof body.source === "string" ? cleanText(body.source).slice(0, 160) : "website",
  };
  const errors = validateInquiry(data);
  if (Object.keys(errors).length) return json({ error: "Please check the highlighted fields.", errors }, 400);
  if (data.website || !Number.isFinite(data.startedAt) || Date.now() - data.startedAt < 1200 || Date.now() - data.startedAt > 48 * 60 * 60 * 1000) return json({ error: "The form could not be verified. Please wait a moment and try again, or refresh the page." }, 400);
  const submissionId = body.submissionId;
  if (typeof submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) return json({ error: "Please refresh the page and try again." }, 400);

  try {
    const existing = await db.select({ id: inquiries.id }).from(inquiries).where(and(eq(inquiries.submissionId, submissionId), eq(inquiries.email, data.email))).limit(1);
    if (existing[0]) return json({ ok: true, reference: reference(existing[0].id) }, 200);

    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const bucket = Math.floor(now / windowMs);
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
    const salt = process.env.CONTACT_RATE_LIMIT_SALT || process.env.DATABASE_URL || "portfolio";
    const keys = [
      { key: createHash("sha256").update(`${salt}:ip:${ip}:${bucket}`).digest("hex"), max: 5 },
      { key: createHash("sha256").update(`${salt}:email:${data.email}:${bucket}`).digest("hex"), max: 3 },
    ];
    await db.delete(contactRateLimits).where(lt(contactRateLimits.expiresAt, new Date(now)));
    const limited = await db.transaction(async (tx) => {
      for (const item of keys) {
        const [result] = await tx.insert(contactRateLimits).values({ key: item.key, attempts: 1, expiresAt: new Date((bucket + 1) * windowMs) }).onConflictDoUpdate({ target: contactRateLimits.key, set: { attempts: sql`${contactRateLimits.attempts} + 1` } }).returning({ attempts: contactRateLimits.attempts });
        if (result.attempts > item.max) return true;
      }
      return false;
    });
    if (limited) return json({ error: "You’ve sent a few inquiries recently. Please try again in 15 minutes." }, 429, { "Retry-After": String(Math.ceil(((bucket + 1) * windowMs - now) / 1000)) });

    const [saved] = await db.insert(inquiries).values({ submissionId, name: data.name, email: data.email, projectType: data.projectType, budget: data.budget, message: data.message, source: data.source || "website" }).onConflictDoNothing({ target: inquiries.submissionId }).returning({ id: inquiries.id });
    if (saved) return json({ ok: true, reference: reference(saved.id) }, 201);
    const [duplicate] = await db.select({ id: inquiries.id }).from(inquiries).where(and(eq(inquiries.submissionId, submissionId), eq(inquiries.email, data.email))).limit(1);
    if (duplicate) return json({ ok: true, reference: reference(duplicate.id) }, 200);
    return json({ error: "Please refresh the page before submitting a new inquiry." }, 409);
  } catch (error) {
    console.error("Inquiry persistence failed:", error instanceof Error ? error.name : "Unknown database error");
    return json({ error: "Your inquiry could not be saved right now. Your form is still here—please try again shortly." }, 503);
  }
}
