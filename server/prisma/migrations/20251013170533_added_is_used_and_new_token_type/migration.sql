-- AlterEnum
ALTER TYPE "public"."TokenType" ADD VALUE 'QR_LOGIN';

-- AlterTable
ALTER TABLE "public"."tokens" ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false;
