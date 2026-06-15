-- AlterTable
ALTER TABLE "sleep_entries" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "weekly_sleep_summary" ADD COLUMN     "avg_rating" INTEGER NOT NULL DEFAULT 0;
