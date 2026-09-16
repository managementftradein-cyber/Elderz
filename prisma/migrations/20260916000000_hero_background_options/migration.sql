-- Additive hero background controls. Existing data is preserved.
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroBackgroundMode" TEXT NOT NULL DEFAULT 'image';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroVideoUrl" TEXT NOT NULL DEFAULT '';
