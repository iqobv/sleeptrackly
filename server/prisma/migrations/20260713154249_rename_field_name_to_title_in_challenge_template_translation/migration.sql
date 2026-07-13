/*
  Warnings:

  - You are about to drop the column `name` on the `challenge_template_translations` table. All the data in the column will be lost.
  - Added the required column `title` to the `challenge_template_translations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "challenge_template_translations" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;
