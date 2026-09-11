/*
  Warnings:

  - You are about to drop the column `is_recovered` on the `challenge_tasks` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ChallengeTaskStatus" ADD VALUE 'RECOVERED';

-- AlterTable
ALTER TABLE "challenge_tasks" DROP COLUMN "is_recovered",
ADD COLUMN     "completed_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user_challenges" ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "frozen_at" TIMESTAMP(3);
