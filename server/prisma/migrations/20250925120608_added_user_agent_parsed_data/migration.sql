-- AlterTable
ALTER TABLE "public"."sessions" ADD COLUMN     "browser_name" TEXT,
ADD COLUMN     "browser_version" TEXT,
ADD COLUMN     "device_type" TEXT;
