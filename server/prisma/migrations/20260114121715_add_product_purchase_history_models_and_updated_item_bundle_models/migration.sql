/*
  Warnings:

  - You are about to drop the column `discounted_price` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `is_limited` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `is_new` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `is_popular` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `is_show_in_store` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `max_stock` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `sold_count` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `discounted_price` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `is_limited` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `is_new` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `is_popular` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `is_show_in_store` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `max_stock` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `sold_count` on the `items` table. All the data in the column will be lost.
  - Added the required column `base_price` to the `bundles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_price` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemRarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('ITEM', 'BUNDLE');

-- AlterTable
ALTER TABLE "bundles" DROP COLUMN "discounted_price",
DROP COLUMN "expires_at",
DROP COLUMN "is_limited",
DROP COLUMN "is_new",
DROP COLUMN "is_popular",
DROP COLUMN "is_show_in_store",
DROP COLUMN "max_stock",
DROP COLUMN "price",
DROP COLUMN "sold_count",
ADD COLUMN     "base_price" INTEGER NOT NULL,
ADD COLUMN     "discount_percentage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_exclusive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "items" DROP COLUMN "discounted_price",
DROP COLUMN "expires_at",
DROP COLUMN "is_limited",
DROP COLUMN "is_new",
DROP COLUMN "is_popular",
DROP COLUMN "is_show_in_store",
DROP COLUMN "max_stock",
DROP COLUMN "price",
DROP COLUMN "sold_count",
ADD COLUMN     "base_price" INTEGER NOT NULL,
ADD COLUMN     "rarity" "ItemRarity" NOT NULL;

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "item_type" "ProfileItemType",
    "bundle_id" TEXT,
    "item_id" TEXT,
    "is_new" BOOLEAN NOT NULL DEFAULT true,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "is_exclusive" BOOLEAN NOT NULL DEFAULT false,
    "is_show_in_store" BOOLEAN NOT NULL DEFAULT true,
    "is_limited" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "discounted_price" INTEGER,
    "max_stock" INTEGER,
    "sold_count" INTEGER NOT NULL DEFAULT 0,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_histories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "price_paid" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_bundle_id_key" ON "products"("bundle_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_item_id_key" ON "products"("item_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_histories" ADD CONSTRAINT "purchase_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_histories" ADD CONSTRAINT "purchase_histories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_histories" ADD CONSTRAINT "purchase_histories_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "coin_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
