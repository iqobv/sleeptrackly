-- AlterTable
ALTER TABLE "bundles" ADD COLUMN     "preview_url" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "preview_url" TEXT NOT NULL DEFAULT '';
