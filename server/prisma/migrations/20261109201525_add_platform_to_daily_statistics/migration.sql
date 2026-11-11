/*
  Warnings:

  - A unique constraint covering the columns `[date,platform]` on the table `daily_statistics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform` to the `daily_statistics` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('WEB', 'ANDROID', 'IOS');

-- DropIndex
DROP INDEX "daily_statistics_date_key";

-- AlterTable
ALTER TABLE "daily_statistics" ADD COLUMN     "platform" "Platform" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "daily_statistics_date_platform_key" ON "daily_statistics"("date", "platform");
