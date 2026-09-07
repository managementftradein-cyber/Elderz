import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getConnectionString() {
  const value = process.env.DATABASE_URL;
  if (!value) throw new Error("DATABASE_URL is not configured.");
  return value;
}

// Supabase pooler connections can present a certificate chain that Node's
// pg driver rejects in some Vercel environments. TLS is still enabled; we
// only disable CA-chain verification for this server-side database socket.
const adapter = new PrismaPg({
  connectionString: getConnectionString(),
  ssl: { rejectUnauthorized: false },
});

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
