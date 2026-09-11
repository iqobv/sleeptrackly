-- AlterTable
ALTER TABLE "weekly_sleep_summary" ALTER COLUMN "total_sleep_duration" SET DEFAULT 0,
ALTER COLUMN "avg_sleep_duration" SET DEFAULT 0,
ALTER COLUMN "min_sleep_duration" SET DEFAULT 0,
ALTER COLUMN "min_sleep_date" DROP NOT NULL,
ALTER COLUMN "max_sleep_duration" SET DEFAULT 0,
ALTER COLUMN "max_sleep_date" DROP NOT NULL,
ALTER COLUMN "avg_bedtime_offset" SET DEFAULT 0,
ALTER COLUMN "avg_wake_time_offset" SET DEFAULT 0,
ALTER COLUMN "days_tracked" SET DEFAULT 0,
ALTER COLUMN "sleep_score_avg" SET DEFAULT 0;
