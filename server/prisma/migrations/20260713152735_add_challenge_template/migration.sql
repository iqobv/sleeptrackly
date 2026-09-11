/*
  Warnings:

  - Added the required column `tier` to the `challenges` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChallengeTier" AS ENUM ('TIER_1', 'TIER_2', 'TIER_3', 'TIER_4');

-- AlterTable
ALTER TABLE "challenges" ADD COLUMN     "tier" "ChallengeTier" NOT NULL;

-- CreateTable
CREATE TABLE "challenge_template_translations" (
    "id" TEXT NOT NULL,
    "challenge_template_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenge_template_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_templates" (
    "id" TEXT NOT NULL,
    "tier" "ChallengeTier" NOT NULL,
    "type" "ChallengeType" NOT NULL,
    "generation_rules" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenge_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "challenge_template_translations_language_idx" ON "challenge_template_translations"("language");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_template_translations_challenge_template_id_langu_key" ON "challenge_template_translations"("challenge_template_id", "language");

-- AddForeignKey
ALTER TABLE "challenge_template_translations" ADD CONSTRAINT "challenge_template_translations_challenge_template_id_fkey" FOREIGN KEY ("challenge_template_id") REFERENCES "challenge_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
