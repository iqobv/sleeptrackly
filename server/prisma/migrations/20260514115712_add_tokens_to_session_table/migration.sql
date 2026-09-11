/*
  Warnings:

  - You are about to drop the column `country` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hast_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[previous_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hast_token` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_session_id_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "country",
DROP COLUMN "session_id",
ADD COLUMN     "hast_token" TEXT NOT NULL,
ADD COLUMN     "os_name" TEXT,
ADD COLUMN     "previous_token" TEXT,
ADD COLUMN     "rotated_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_hast_token_key" ON "sessions"("hast_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_previous_token_key" ON "sessions"("previous_token");
