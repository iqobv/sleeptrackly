-- CreateTable
CREATE TABLE "user_notification_settings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_email_notifications_enabled" BOOLEAN NOT NULL DEFAULT false,
    "is_in_app_notifications_enabled" BOOLEAN NOT NULL DEFAULT true,
    "is_reminder_timer_enabled" BOOLEAN NOT NULL DEFAULT false,
    "is_updates_enabled" BOOLEAN NOT NULL DEFAULT true,
    "is_friend_requests_enabled" BOOLEAN NOT NULL DEFAULT true,
    "is_achievement_unlocked_enabled" BOOLEAN NOT NULL DEFAULT true,
    "reminder_time" TEXT,
    "user_time_zone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_notification_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_notification_settings_user_id_key" ON "user_notification_settings"("user_id");

-- AddForeignKey
ALTER TABLE "user_notification_settings" ADD CONSTRAINT "user_notification_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
