-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'CHALLENGE_COMPLETED';
ALTER TYPE "NotificationType" ADD VALUE 'CHALLENGE_FAILED';
ALTER TYPE "NotificationType" ADD VALUE 'CHALLENGE_FROZEN';
ALTER TYPE "NotificationType" ADD VALUE 'CHALLENGE_EXPIRED';
ALTER TYPE "NotificationType" ADD VALUE 'CHALLENGE_INVITATION';
ALTER TYPE "NotificationType" ADD VALUE 'CHALLENGE_RESTORED';

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "challenge_id" TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
