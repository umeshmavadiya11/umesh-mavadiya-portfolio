import "dotenv/config";
import assert from "node:assert/strict";
import { like } from "drizzle-orm";
import { db, pool } from "@/db";
import { contactRateLimits, inquiries } from "@/db/schema";

async function main() {
  if (!/@(?:127\.0\.0\.1|localhost):/.test(process.env.DATABASE_URL || "")) {
    throw new Error("This test-data helper is restricted to local PostgreSQL databases.");
  }
  const testOnly = like(inquiries.email, "%@portfolio-test.example");
  const records = await db.select().from(inquiries).where(testOnly);
  if (!process.argv.includes("--reset")) {
    assert.ok(records.length > 0, "Expected a browser test inquiry to be persisted.");
    for (const record of records) {
      assert.equal(record.name, "Portfolio Browser Test");
      assert.equal(record.projectType, "Full-Stack Development");
      assert.equal(record.status, "new");
      assert.ok(record.message.includes("Automated end-to-end inquiry test"));
      assert.ok(record.createdAt instanceof Date);
    }
    assert.equal(new Set(records.map((record) => record.submissionId)).size, records.length);
    console.log(`Verified ${records.length} persisted test inquiries, including unique submission IDs and timestamps.`);
  }
  await db.delete(inquiries).where(testOnly);
  await db.delete(contactRateLimits);
  console.log("Removed reserved-domain test inquiries and reset local test rate limits.");
}

main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : "Database check failed"); process.exitCode = 1; }).finally(() => pool.end());
