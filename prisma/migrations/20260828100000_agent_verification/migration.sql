CREATE TYPE "AgentStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED');

ALTER TABLE "Agent" ADD COLUMN "licenseNumber" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Agent" ADD COLUMN "licenseType" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Agent" ADD COLUMN "governmentIdPath" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Agent" ADD COLUMN "licenseDocumentPath" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Agent" ADD COLUMN "proofAddressPath" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Agent" ADD COLUMN "selfiePath" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Agent" ADD COLUMN "status" "AgentStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "Agent" ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Agent" ADD COLUMN "phoneVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Agent" ADD COLUMN "identityVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Agent" ADD COLUMN "licenseVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Agent" ADD COLUMN "backgroundCheckVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Agent" ADD COLUMN "verificationNotes" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Agent" ADD COLUMN "reviewedAt" TIMESTAMP(3);
ALTER TABLE "Agent" ADD COLUMN "acceptedAt" TIMESTAMP(3);

UPDATE "Agent" SET "status"='VERIFIED', "emailVerified"=true, "phoneVerified"=true, "identityVerified"=true, "licenseVerified"=true, "backgroundCheckVerified"=true, "reviewedAt"="createdAt", "acceptedAt"="createdAt";
