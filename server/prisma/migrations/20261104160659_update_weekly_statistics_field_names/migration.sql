/*
  Warnings:

  - You are about to drop the column `challenge_completed_count` on the `weekly_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `challenge_failed_count` on the `weekly_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `challenge_started_count` on the `weekly_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_count` on the `weekly_statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "weekly_statistics" DROP COLUMN "challenge_completed_count",
DROP COLUMN "challenge_failed_count",
DROP COLUMN "challenge_started_count",
DROP COLUMN "purchase_count",
ADD COLUMN     "challenges_completed_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "challenges_failed_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "challenges_started_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "purchases_count" INTEGER NOT NULL DEFAULT 0;
