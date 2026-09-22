import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const baseURL = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await mkdir("artifacts", { recursive: true });

try {
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  assert.match(await page.title(), /Umesh Mavadiya/);
  assert.equal(await page.locator("h1").count(), 1);
  await page.screenshot({ path: "artifacts/portfolio-desktop.png" });
  await page.getByRole("button", { name: "Explore Backend", exact: true }).click();
  assert.equal(await page.getByRole("button", { name: "Explore Backend", exact: true }).getAttribute("aria-pressed"), "true");
  assert.match(await page.locator(".editor-titlebar").innerText(), /api\/router.ts/);
  await page.getByRole("button", { name: "Explore Frontend", exact: true }).click();
  console.log("PASS: hero layer controls");

  await page.getByRole("tab", { name: /Real-Time System/ }).click();
  await page.getByRole("button", { name: /Live transport WebSocket \/ SSE/ }).click();
  assert.match(await page.locator(".architecture-detail").innerText(), /Authenticate subscriptions/);
  await page.getByRole("tab", { name: /CI\/CD Pipeline/ }).focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.getByRole("tab", { name: /CI\/CD Pipeline/ }).getAttribute("aria-selected"), "true");
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.getByRole("tab", { name: /Full-Stack Application/ }).getAttribute("aria-selected"), "true");
  console.log("PASS: architecture tabs, layers, and keyboard navigation");

  const faq = page.locator(".faq-list details");
  await faq.nth(1).locator("summary").click();
  assert.equal(await faq.nth(1).getAttribute("open"), "");
  assert.equal(await faq.first().getAttribute("open"), null);
  console.log("PASS: accessible FAQ disclosure");

  for (const width of [320, 375, 390, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const overflow = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, expected: window.innerWidth }));
    assert.ok(overflow.actual <= overflow.expected + 1, `Horizontal overflow at ${width}: ${JSON.stringify(overflow)}`);
    console.log(`PASS: homepage responsive width ${width}px`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "artifacts/portfolio-mobile.png" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(await page.getByRole("button", { name: "Close navigation" }).getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded"), "false");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Expertise/ }).click();
  assert.equal(await page.locator(".mobile-menu").count(), 0);
  console.log("PASS: mobile menu, Escape, and section links");

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseURL}/work`, { waitUntil: "networkidle" });
  assert.equal(await page.locator(".project-card").count(), 6);
  await page.getByRole("button", { name: "AI & Automation", exact: true }).click();
  assert.equal(await page.locator(".project-card").count(), 1);
  assert.match(await page.locator(".project-card").innerText(), /AI Voice Assistant/);
  await page.getByLabel("Search projects or technologies").fill("no-such-project");
  assert.equal(await page.getByRole("heading", { name: "No projects found." }).count(), 1);
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.equal(await page.locator(".project-card").count(), 6);
  await page.getByLabel("Search projects or technologies").fill("MQTT");
  assert.equal(await page.locator(".project-card").count(), 1);
  await page.getByLabel("Search projects or technologies").fill("");
  console.log("PASS: project category, search, and empty-state reset");

  await page.getByRole("link", { name: "View case study: Enterprise Reporting Platform", exact: true }).click();
  await page.waitForURL("**/work/enterprise-reporting-platform");
  assert.match(await page.locator("h1").innerText(), /Enterprise Reporting Platform/);
  assert.match(await page.locator(".case-disclosure").innerText(), /illustrative project concepts/);
  await page.screenshot({ path: "artifacts/case-study-desktop.png" });
  await page.getByRole("link", { name: "Build something like this" }).click();
  await page.waitForURL("**/contact?project=enterprise-reporting-platform");
  assert.equal(await page.getByLabel("What do you need help with?").inputValue(), "Full-Stack Development");
  assert.match(await page.getByLabel("A little about your project").inputValue(), /Enterprise Reporting Platform/);
  console.log("PASS: dedicated case study and contextual inquiry");

  await page.getByRole("button", { name: "Let’s start a conversation" }).click();
  assert.match(await page.locator("#error-name").innerText(), /Please enter your name/);
  assert.equal(await page.locator("#contact-name").evaluate((el) => el === document.activeElement), true);
  await page.getByLabel("Your name").fill("Portfolio Browser Test");
  const email = `browser-${randomUUID()}@portfolio-test.example`;
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("A little about your project").fill("Automated end-to-end inquiry test. Verifying that validated project details are persisted reliably in PostgreSQL.");
  await page.getByLabel(/I agree to my details/).check();
  assert.equal(await page.locator(".contact-form [aria-invalid=\"true\"]").count(), 0, "Corrected fields should clear stale validation errors");
  await page.screenshot({ path: "artifacts/contact-desktop.png" });
  await page.waitForTimeout(1400);
  const [response] = await Promise.all([page.waitForResponse((res) => res.url().endsWith("/api/inquiries") && res.request().method() === "POST"), page.getByRole("button", { name: "Let’s start a conversation" }).click()]);
  assert.equal(response.status(), 201, await response.text());
  const saved = await response.json();
  assert.match(saved.reference, /^UM-[A-F0-9]{8}$/);
  await page.getByRole("heading", { name: /Your idea is in/ }).waitFor();
  const payload = response.request().postDataJSON();
  const duplicate = await context.request.post(`${baseURL}/api/inquiries`, { data: payload });
  assert.equal(duplicate.status(), 200);
  assert.equal((await duplicate.json()).reference, saved.reference);
  console.log(`PASS: real database submission, reference ${saved.reference}, idempotent retry`);

  const invalid = await context.request.post(`${baseURL}/api/inquiries`, { data: {} });
  assert.equal(invalid.status(), 400);
  const spam = await context.request.post(`${baseURL}/api/inquiries`, { data: { ...payload, website: "https://spam.example", submissionId: randomUUID() } });
  assert.equal(spam.status(), 400);
  const crossOrigin = await context.request.post(`${baseURL}/api/inquiries`, { headers: { origin: "https://untrusted.example" }, data: payload });
  assert.equal(crossOrigin.status(), 403);
  console.log("PASS: server validation, honeypot, and origin checks");

  const rateEmail = `rate-${randomUUID()}@portfolio-test.example`;
  for (let i = 0; i < 4; i++) {
    const result = await context.request.post(`${baseURL}/api/inquiries`, { headers: { "x-forwarded-for": "198.51.100.42" }, data: { ...payload, email: rateEmail, submissionId: randomUUID(), startedAt: Date.now() - 5000 } });
    assert.equal(result.status(), i < 3 ? 201 : 429, await result.text());
    if (i === 3) assert.ok(result.headers()["retry-after"]);
  }
  console.log("PASS: durable rate limiting and Retry-After response");

  for (const path of ["/about", "/services", "/privacy", "/contact?service=API%20Development", "/contact?channel=contra", "/work/ai-voice-assistant"]) {
    await page.goto(`${baseURL}${path}`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").count(), 1);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      assert.equal(overflow, false, `Horizontal overflow: ${path} at ${width}px`);
    }
  }
  const health = await context.request.get(`${baseURL}/api/health`);
  assert.equal(health.status(), 200);
  for (const path of ["/sitemap.xml", "/robots.txt", "/opengraph-image", "/icon.svg"]) assert.equal((await context.request.get(`${baseURL}${path}`)).status(), 200, path);
  assert.equal((await context.request.get(`${baseURL}/work/not-a-real-project`)).status(), 404);
  assert.deepEqual(errors, []);
  console.log("PASS: remaining routes, metadata, health, 404 handling, and no browser exceptions");
  console.log("All end-to-end checks passed.");
} finally {
  await browser.close();
}
