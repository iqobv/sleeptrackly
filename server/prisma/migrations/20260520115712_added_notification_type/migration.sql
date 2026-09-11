-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FRIEND_REQUEST', 'SANCTION', 'WEEKLY_SUMMARY', 'INFORMATION', 'MAINTENANCE', 'UPDATE', 'PERSONAL_MESSAGE', 'MARKETING', 'OTHER');

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "type" "NotificationType" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "weekly_sleep_summary_id" TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_weekly_sleep_summary_id_fkey" FOREIGN KEY ("weekly_sleep_summary_id") REFERENCES "weekly_sleep_summary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
