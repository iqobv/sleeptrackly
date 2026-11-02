/*
  Warnings:

  - The values [BROKEN,COMPLETED] on the enum `StreakStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `last_activity_date` to the `streaks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StreakStatus_new" AS ENUM ('ACTIVE', 'FROZEN', 'ENDED');
ALTER TABLE "public"."streaks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "streaks" ALTER COLUMN "status" TYPE "StreakStatus_new" USING ("status"::text::"StreakStatus_new");
ALTER TYPE "StreakStatus" RENAME TO "StreakStatus_old";
ALTER TYPE "StreakStatus_new" RENAME TO "StreakStatus";
DROP TYPE "public"."StreakStatus_old";
ALTER TABLE "streaks" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "streaks" ADD COLUMN     "last_activity_date" TEXT NOT NULL;
