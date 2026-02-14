-- CreateEnum
CREATE TYPE "ProfileItemType" AS ENUM ('AVATAR', 'AVATAR_FRAME', 'ANIMATED_AVATAR', 'BACKGROUND_IMAGE', 'MINI_BACKGROUND_IMAGE', 'BADGE');

-- CreateTable
CREATE TABLE "bundle_translations" (
    "id" TEXT NOT NULL,
    "bundle_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bundle_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bundles" (
    "id" TEXT NOT NULL,
    "is_limited" BOOLEAN NOT NULL DEFAULT false,
    "is_show_in_store" BOOLEAN NOT NULL DEFAULT true,
    "is_new" BOOLEAN NOT NULL DEFAULT true,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "max_stock" INTEGER,
    "discounted_price" INTEGER,
    "sold_count" INTEGER NOT NULL DEFAULT 0,
    "media_url" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bundles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items_in_bundles" (
    "item_id" TEXT NOT NULL,
    "bundle_id" TEXT NOT NULL,

    CONSTRAINT "items_in_bundles_pkey" PRIMARY KEY ("item_id","bundle_id")
);

-- CreateTable
CREATE TABLE "item_translations" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "type" "ProfileItemType" NOT NULL,
    "is_limited" BOOLEAN NOT NULL DEFAULT false,
    "is_show_in_store" BOOLEAN NOT NULL DEFAULT true,
    "is_new" BOOLEAN NOT NULL DEFAULT true,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "is_exclusive" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "max_stock" INTEGER,
    "discounted_price" INTEGER,
    "sold_count" INTEGER NOT NULL DEFAULT 0,
    "media_url" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bundle_translations_bundle_id_language_key" ON "bundle_translations"("bundle_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "item_translations_item_id_language_key" ON "item_translations"("item_id", "language");

-- AddForeignKey
ALTER TABLE "bundle_translations" ADD CONSTRAINT "bundle_translations_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_in_bundles" ADD CONSTRAINT "items_in_bundles_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_in_bundles" ADD CONSTRAINT "items_in_bundles_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_translations" ADD CONSTRAINT "item_translations_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
