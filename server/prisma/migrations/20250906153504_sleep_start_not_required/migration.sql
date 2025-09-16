-- AlterTable
ALTER TABLE "public"."user_sleep_status" ALTER COLUMN "sleep_start" DROP NOT NULL,
ALTER COLUMN "sleep_start" DROP DEFAULT;
