-- CreateTable
CREATE TABLE "global_notification_read" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "notification_id" TEXT NOT NULL,
    "read_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_notification_read_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "global_notification_read_user_id_notification_id_key" ON "global_notification_read"("user_id", "notification_id");

-- AddForeignKey
ALTER TABLE "global_notification_read" ADD CONSTRAINT "global_notification_read_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_notification_read" ADD CONSTRAINT "global_notification_read_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
