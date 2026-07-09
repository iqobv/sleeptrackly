/*
  Warnings:

  - You are about to drop the column `user_time_zone` on the `user_notification_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sleep_entries" ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "user_notification_settings" DROP COLUMN "user_time_zone";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';
