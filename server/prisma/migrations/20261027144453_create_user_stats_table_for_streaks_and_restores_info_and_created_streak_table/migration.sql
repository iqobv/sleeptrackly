/*
  Warnings:

- You are about to drop the column `challenge_recoveries` on the `users` table. All the data in the column will be lost.
- You are about to drop the column `challenge_recoveries_updated_at` on the `users` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "streaks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "length" INTEGER NOT NULL DEFAULT 0,
    "restores_used" INTEGER NOT NULL DEFAULT 0,
    "last_restored_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "streaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_stats" (
    "userId" TEXT NOT NULL,
    "current_streak_id" TEXT,
    "streak_restores" INTEGER NOT NULL DEFAULT 1,
    "streak_restores_reset_at" TIMESTAMP(3),
    "challenge_restores" INTEGER NOT NULL DEFAULT 2,
    "challenge_restores_reset_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_stats_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "streaks_user_id_idx" ON "streaks"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_stats_current_streak_id_key" ON "user_stats"("current_streak_id");

-- AddForeignKey
ALTER TABLE "streaks" ADD CONSTRAINT "streaks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_current_streak_id_fkey" FOREIGN KEY ("current_streak_id") REFERENCES "streaks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- MigrateData
INSERT INTO "user_stats" ("userId", "challenge_restores", "challenge_restores_reset_at", "updated_at")
SELECT
    "id",
    COALESCE("challenge_recoveries", 2),
    "challenge_recoveries_updated_at",
    CURRENT_TIMESTAMP
FROM "users";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "challenge_recoveries",
DROP COLUMN "challenge_recoveries_updated_at";
