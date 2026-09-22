import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

const poolConfig: any = {
  connectionString: databaseUrl,
};

// For development/testing, allow self-signed certificates
if (process.env.NODE_ENV !== "production") {
  poolConfig.ssl = {
    rejectUnauthorized: false,
    requestCert: false,
  };
}

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool(poolConfig);

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
