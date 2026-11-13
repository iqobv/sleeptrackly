-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "friendship_id" TEXT,
ADD COLUMN     "streak_id" TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_friendship_id_fkey" FOREIGN KEY ("friendship_id") REFERENCES "friendships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_streak_id_fkey" FOREIGN KEY ("streak_id") REFERENCES "streaks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
