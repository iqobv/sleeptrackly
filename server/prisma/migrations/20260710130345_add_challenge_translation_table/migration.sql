-- CreateTable
CREATE TABLE "challenge_translations" (
    "id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenge_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "challenge_translations_challenge_id_language_key" ON "challenge_translations"("challenge_id", "language");

-- AddForeignKey
ALTER TABLE "challenge_translations" ADD CONSTRAINT "challenge_translations_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
