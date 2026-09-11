-- CreateTable
CREATE TABLE "weekly_sleep_summary" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "week_number" INTEGER NOT NULL,
    "week_start_date" TIMESTAMP(3) NOT NULL,
    "week_end_date" TIMESTAMP(3) NOT NULL,
    "total_sleep_duration" INTEGER NOT NULL,
    "avg_sleep_duration" INTEGER NOT NULL,
    "min_sleep_duration" INTEGER NOT NULL,
    "min_sleep_date" TIMESTAMP(3) NOT NULL,
    "max_sleep_duration" INTEGER NOT NULL,
    "max_sleep_date" TIMESTAMP(3) NOT NULL,
    "avg_bedtime_offset" INTEGER NOT NULL,
    "avg_wake_time_offset" INTEGER NOT NULL,
    "days_tracked" INTEGER NOT NULL,
    "sleep_score_avg" INTEGER NOT NULL,
    "coins_earned" INTEGER NOT NULL DEFAULT 0,
    "achievements_unlocked" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weekly_sleep_summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "weekly_sleep_summary_user_id_year_idx" ON "weekly_sleep_summary"("user_id", "year");

-- CreateIndex
CREATE UNIQUE INDEX "weekly_sleep_summary_user_id_year_week_number_key" ON "weekly_sleep_summary"("user_id", "year", "week_number");

-- AddForeignKey
ALTER TABLE "weekly_sleep_summary" ADD CONSTRAINT "weekly_sleep_summary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
