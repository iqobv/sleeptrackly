/*
  Warnings:

  - You are about to drop the column `challenge_id` on the `challenge_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `completed_value` on the `challenge_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `challenge_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `challenge_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `challenge_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `target_value` on the `challenge_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `is_started` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `challenges` table. All the data in the column will be lost.
  - Added the required column `date` to the `challenge_tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_challenge_id` to the `challenge_tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_value` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `challenges` table without a default value. This is not possible if the table is not empty.

*/

-- TruncateTable
TRUNCATE TABLE "challenge_tasks" CASCADE;
TRUNCATE TABLE "challenges" CASCADE;

-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('SLEEP_DURATION', 'BEDTIME_CONSISTENCY', 'WAKE_TIME_CONSISTENCY', 'BEDTIME_VARIANCE');

-- CreateEnum
CREATE TYPE "ChallengeVisibility" AS ENUM ('DRAFT', 'PUBLISHED');

-- DropForeignKey
ALTER TABLE "challenge_tasks" DROP CONSTRAINT "challenge_tasks_challenge_id_fkey";

-- DropForeignKey
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_user_id_fkey";

-- AlterTable
ALTER TABLE "challenge_tasks" DROP COLUMN "challenge_id",
DROP COLUMN "completed_value",
DROP COLUMN "description",
DROP COLUMN "end_date",
DROP COLUMN "start_date",
DROP COLUMN "target_value",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "is_failed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_recovered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sleep_entry_id" TEXT,
ADD COLUMN     "user_challenge_id" TEXT NOT NULL,
ALTER COLUMN "is_completed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "deleted_at",
DROP COLUMN "description",
DROP COLUMN "end_date",
DROP COLUMN "frequency",
DROP COLUMN "is_completed",
DROP COLUMN "is_started",
DROP COLUMN "start_date",
DROP COLUMN "title",
DROP COLUMN "user_id",
ADD COLUMN     "available_from" TIMESTAMP(3),
ADD COLUMN     "available_to" TIMESTAMP(3),
ADD COLUMN     "duration_days" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "max_recoveries" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "reward_coins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reward_product_id" TEXT,
ADD COLUMN     "target_value" INTEGER NOT NULL,
ADD COLUMN     "type" "ChallengeType" NOT NULL,
ADD COLUMN     "visibility" "ChallengeVisibility" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "challenge_recoveries" INTEGER NOT NULL DEFAULT 2;

-- CreateTable
CREATE TABLE "user_challenges" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,
    "status" "ChallengeStatus" NOT NULL DEFAULT 'ACTIVE',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "used_recoveries" INTEGER NOT NULL DEFAULT 0,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_challenges_user_id_challenge_id_key" ON "user_challenges"("user_id", "challenge_id");

-- CreateIndex
CREATE INDEX "challenges_available_from_available_to_visibility_idx" ON "challenges"("available_from", "available_to", "visibility");

-- AddForeignKey
ALTER TABLE "challenge_tasks" ADD CONSTRAINT "challenge_tasks_user_challenge_id_fkey" FOREIGN KEY ("user_challenge_id") REFERENCES "user_challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_tasks" ADD CONSTRAINT "challenge_tasks_sleep_entry_id_fkey" FOREIGN KEY ("sleep_entry_id") REFERENCES "sleep_entries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_reward_product_id_fkey" FOREIGN KEY ("reward_product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
