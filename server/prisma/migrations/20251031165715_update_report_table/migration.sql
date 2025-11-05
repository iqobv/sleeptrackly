/*
  Warnings:

  - You are about to drop the column `reported_id` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `reports` table. All the data in the column will be lost.
  - Added the required column `reporter_id` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserSanctionType" AS ENUM ('AVATAR_CHANGE_BAN', 'USERNAME_CHANGE_BAN');

-- DropForeignKey
ALTER TABLE "public"."reports" DROP CONSTRAINT "reports_reported_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."reports" DROP CONSTRAINT "reports_sender_id_fkey";

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "reported_id",
DROP COLUMN "sender_id",
ADD COLUMN     "reporter_id" TEXT NOT NULL,
ADD COLUMN     "reviewed_by_id" TEXT,
ADD COLUMN     "target_user_id" TEXT;

-- CreateTable
CREATE TABLE "user_sanctions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "report_id" TEXT,
    "created_by_id" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3),
    "type" "UserSanctionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_sanctions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_sanctions_user_id_type_key" ON "user_sanctions"("user_id", "type");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sanctions" ADD CONSTRAINT "user_sanctions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sanctions" ADD CONSTRAINT "user_sanctions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sanctions" ADD CONSTRAINT "user_sanctions_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
