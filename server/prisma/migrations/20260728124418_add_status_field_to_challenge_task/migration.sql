/*
  Warnings:

  - You are about to drop the column `is_completed` on the `challenge_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `is_failed` on the `challenge_tasks` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ChallengeTaskStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "challenge_tasks" DROP COLUMN "is_completed",
DROP COLUMN "is_failed",
ADD COLUMN     "status" "ChallengeTaskStatus" NOT NULL DEFAULT 'PENDING';
