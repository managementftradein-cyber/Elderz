-- Elderz Real Estate initial PostgreSQL schema
CREATE TYPE "PropertyStatus" AS ENUM ('FOR_SALE', 'FOR_RENT', 'SOLD', 'RENTED', 'DRAFT');
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED');
CREATE TYPE "AgentStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED');

CREATE TABLE "AdminUser" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

CREATE TABLE "SiteSettings" (
  "id" TEXT NOT NULL,
  "siteName" TEXT NOT NULL DEFAULT 'Elderz Real Estate',
  "tagline" TEXT NOT NULL DEFAULT 'Nurture your future home',
  "phone" TEXT NOT NULL DEFAULT 'Placeholder',
  "email" TEXT NOT NULL DEFAULT 'Placeholder',
  "address" TEXT NOT NULL DEFAULT 'Placeholder',
  "heroTitle" TEXT NOT NULL DEFAULT 'Nurture your future home',
  "heroSubtitle" TEXT NOT NULL DEFAULT 'Discover houses, apartments, land and commercial properties with confidence.',
  "heroImage" TEXT NOT NULL DEFAULT '',
  "aboutTitle" TEXT NOT NULL DEFAULT 'Property decisions made with confidence.',
  "aboutText" TEXT NOT NULL DEFAULT 'Elderz Real Estate helps clients discover, buy, rent and manage exceptional property.',
  "facebook" TEXT NOT NULL DEFAULT '',
  "instagram" TEXT NOT NULL DEFAULT '',
  "whatsapp" TEXT NOT NULL DEFAULT 'Placeholder',
  "logoUrl" TEXT NOT NULL DEFAULT '',
  "primaryColor" TEXT NOT NULL DEFAULT '#0B0F0C',
  "secondaryColor" TEXT NOT NULL DEFAULT '#C8A94B',
  "redColor" TEXT NOT NULL DEFAULT '#B42318',
  "whiteColor" TEXT NOT NULL DEFAULT '#FFFFFF',
  "currencyMode" TEXT NOT NULL DEFAULT 'NGN_USD',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Property" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'NGN',
  "status" "PropertyStatus" NOT NULL DEFAULT 'FOR_SALE',
  "type" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "bedrooms" INTEGER NOT NULL DEFAULT 0,
  "bathrooms" INTEGER NOT NULL DEFAULT 0,
  "area" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "imageUrl" TEXT NOT NULL,
  "gallery" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

CREATE TABLE "Agent" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "photoUrl" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "whatsapp" TEXT NOT NULL,
  "licenseNumber" TEXT NOT NULL DEFAULT '',
  "licenseType" TEXT NOT NULL DEFAULT '',
  "governmentIdPath" TEXT NOT NULL DEFAULT '',
  "licenseDocumentPath" TEXT NOT NULL DEFAULT '',
  "proofAddressPath" TEXT NOT NULL DEFAULT '',
  "selfiePath" TEXT NOT NULL DEFAULT '',
  "status" "AgentStatus" NOT NULL DEFAULT 'PENDING',
  "emailVerified" BOOLEAN NOT NULL DEFAULT false,
  "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
  "identityVerified" BOOLEAN NOT NULL DEFAULT false,
  "licenseVerified" BOOLEAN NOT NULL DEFAULT false,
  "backgroundCheckVerified" BOOLEAN NOT NULL DEFAULT false,
  "verificationNotes" TEXT NOT NULL DEFAULT '',
  "reviewedAt" TIMESTAMP(3),
  "acceptedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Service" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "published" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Testimonial" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "quote" TEXT NOT NULL,
  "photoUrl" TEXT NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FAQ" (
  "id" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "published" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BlogPost" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

CREATE TABLE "Inquiry" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL DEFAULT '',
  "message" TEXT NOT NULL,
  "propertyId" TEXT,
  "settingsId" TEXT,
  "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "SiteSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Safe initial CMS settings so the public site has content immediately after migration.
INSERT INTO "SiteSettings" ("id", "updatedAt", "logoUrl")
VALUES ('cm_initial_site_settings', CURRENT_TIMESTAMP, '/elderz-logo.png')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Service" ("id", "title", "description", "icon", "sortOrder", "published") VALUES
('cm_service_sales', 'Property Sales', 'Professional guidance for buying property.', 'home', 1, true),
('cm_service_rentals', 'Property Rentals', 'Find suitable rental properties.', 'key', 2, true),
('cm_service_management', 'Property Management', 'Reliable management for property owners.', 'building', 3, true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Testimonial" ("id", "name", "role", "quote", "photoUrl", "published")
VALUES ('cm_testimonial_placeholder', 'Client Placeholder', 'Property Client', 'Elderz Real Estate made the process clear and professional.', '', true)
ON CONFLICT ("id") DO NOTHING;
