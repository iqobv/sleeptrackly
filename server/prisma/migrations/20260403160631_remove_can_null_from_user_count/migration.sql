/*
  Warnings:

  - Made the column `used_count` on table `promotions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "promotions" ALTER COLUMN "used_count" SET NOT NULL;
