/*
  Warnings:

  - Made the column `description` on table `challenge_translations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "challenge_translations" ALTER COLUMN "description" SET NOT NULL;
