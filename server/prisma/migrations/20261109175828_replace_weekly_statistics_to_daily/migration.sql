/*
  Warnings:

  - You are about to drop the `weekly_statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "weekly_statistics";

-- CreateTable
CREATE TABLE "daily_statistics" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "registered_count" INTEGER NOT NULL DEFAULT 0,
    "achievements_count" INTEGER NOT NULL DEFAULT 0,
    "challenges_completed_count" INTEGER NOT NULL DEFAULT 0,
    "challenges_started_count" INTEGER NOT NULL DEFAULT 0,
    "challenges_failed_count" INTEGER NOT NULL DEFAULT 0,
    "purchases_count" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_statistics_date_key" ON "daily_statistics"("date");

-- CreateIndex
CREATE INDEX "sleep_entries_date_for_chart_is_verified_user_id_idx" ON "sleep_entries"("date_for_chart", "is_verified", "user_id");
