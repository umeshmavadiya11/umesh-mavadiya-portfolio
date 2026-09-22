import { db, pool } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, message: "Database is connected and healthy" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Database health check failed:", errorMessage);
    return Response.json({
      ok: false,
      error: errorMessage,
      databaseUrl: process.env.DATABASE_URL ? "configured" : "not set"
    }, { status: 503 });
  }
}
