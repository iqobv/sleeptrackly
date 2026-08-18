-- AlterEnum
ALTER TYPE "ChallengeStatus" ADD VALUE 'FROZEN';

-- AlterTable
ALTER TABLE "sleep_entries" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "user_sleep_status" ADD COLUMN     "sleep_end" TIMESTAMP(3);

-- DropEnum
DROP TYPE "ChallengeFrequency";
