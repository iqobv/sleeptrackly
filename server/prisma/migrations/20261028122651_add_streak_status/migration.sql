-- CreateEnum
CREATE TYPE "StreakStatus" AS ENUM ('ACTIVE', 'BROKEN', 'COMPLETED');

-- AlterTable
ALTER TABLE "streaks" ADD COLUMN     "status" "StreakStatus" NOT NULL DEFAULT 'ACTIVE';
