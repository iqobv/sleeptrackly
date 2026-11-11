-- CreateTable
CREATE TABLE "weekly_statistics" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "iso_week" INTEGER NOT NULL,
    "registered_count" INTEGER NOT NULL DEFAULT 0,
    "active_users_count" INTEGER NOT NULL DEFAULT 0,
    "achievements_count" INTEGER NOT NULL DEFAULT 0,
    "challenge_completed_count" INTEGER NOT NULL DEFAULT 0,
    "challenge_started_count" INTEGER NOT NULL DEFAULT 0,
    "challenge_failed_count" INTEGER NOT NULL DEFAULT 0,
    "purchase_count" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weekly_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weekly_statistics_year_iso_week_key" ON "weekly_statistics"("year", "iso_week");
