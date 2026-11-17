-- DropIndex
DROP INDEX "notifications_user_id_idx";

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "is_important" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "notifications_user_id_is_important_created_at_idx" ON "notifications"("user_id", "is_important" DESC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "notifications_is_global_is_important_created_at_idx" ON "notifications"("is_global", "is_important" DESC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "notifications_is_important_created_at_idx" ON "notifications"("is_important", "created_at");
