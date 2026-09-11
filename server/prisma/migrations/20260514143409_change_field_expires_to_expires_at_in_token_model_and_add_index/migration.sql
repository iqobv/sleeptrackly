/*
  Warnings:

  - You are about to drop the column `expires` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `is_used` on the `tokens` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/

TRUNCATE TABLE "tokens" CASCADE;

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN IF EXISTS "expires",
DROP COLUMN IF EXISTS "is_used",
ADD COLUMN "expires_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
DROP INDEX IF EXISTS "tokens_user_id_type_idx";
CREATE INDEX "tokens_user_id_type_idx" ON "tokens"("user_id", "type");
