/*
  Warnings:

  - You are about to drop the column `description` on the `collection_translations` table. All the data in the column will be lost.
  - You are about to drop the column `background_image` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the `collection_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accent_color` to the `collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon_url` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "collection_items" DROP CONSTRAINT "collection_items_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "collection_items" DROP CONSTRAINT "collection_items_product_id_fkey";

-- AlterTable
ALTER TABLE "collection_translations" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "background_image",
ADD COLUMN     "accent_color" TEXT NOT NULL,
ADD COLUMN     "icon_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "collection_items";

-- CreateTable
CREATE TABLE "collection_products" (
    "id" TEXT NOT NULL,
    "collection_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
