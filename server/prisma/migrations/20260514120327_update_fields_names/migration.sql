/*
  Warnings:

  - You are about to drop the column `hast_token` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash_token` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX IF EXISTS "sessions_hast_token_key";
DROP INDEX IF EXISTS "sessions_hash_token_key";

TRUNCATE TABLE "sessions" CASCADE;

-- AlterTable
ALTER TABLE "sessions"
DROP COLUMN IF EXISTS "hast_token",
DROP COLUMN IF EXISTS "hash_token";

ALTER TABLE "sessions"
ADD COLUMN "hash_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_hash_token_key" ON "sessions"("hash_token");
