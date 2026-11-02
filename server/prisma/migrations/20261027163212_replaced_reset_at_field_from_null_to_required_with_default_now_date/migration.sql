/*
  Warnings:

  - Made the column `streak_restores_reset_at` on table `user_stats` required. This step will fail if there are existing NULL values in that column.
  - Made the column `challenge_restores_reset_at` on table `user_stats` required. This step will fail if there are existing NULL values in that column.

*/
-- UpdateData
UPDATE "user_stats"
SET "streak_restores_reset_at" = CURRENT_TIMESTAMP
WHERE "streak_restores_reset_at" IS NULL;

UPDATE "user_stats"
SET "challenge_restores_reset_at" = CURRENT_TIMESTAMP
WHERE "challenge_restores_reset_at" IS NULL;

-- AlterTable
ALTER TABLE "user_stats" ALTER COLUMN "streak_restores_reset_at" SET NOT NULL,
ALTER COLUMN "streak_restores_reset_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "challenge_restores_reset_at" SET NOT NULL,
ALTER COLUMN "challenge_restores_reset_at" SET DEFAULT CURRENT_TIMESTAMP;
