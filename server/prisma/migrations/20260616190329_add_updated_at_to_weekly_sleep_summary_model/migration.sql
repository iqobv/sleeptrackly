/*
  Warnings:

  - Added the required column `updated_at` to the `weekly_sleep_summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weekly_sleep_summary" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
