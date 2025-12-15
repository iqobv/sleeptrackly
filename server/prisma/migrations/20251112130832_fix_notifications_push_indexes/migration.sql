/*
  Warnings:

  - A unique constraint covering the columns `[endpoint]` on the table `user_push_subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "scheduled_at" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_push_subscriptions_endpoint_key" ON "user_push_subscriptions"("endpoint");

-- CreateIndex
CREATE INDEX "user_push_subscriptions_user_id_idx" ON "user_push_subscriptions"("user_id");
