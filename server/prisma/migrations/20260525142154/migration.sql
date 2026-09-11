/*
  Warnings:

  - A unique constraint covering the columns `[achievement_id,language]` on the table `achievement_translations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "achievement_translations_achievement_id_language_key" ON "achievement_translations"("achievement_id", "language");
