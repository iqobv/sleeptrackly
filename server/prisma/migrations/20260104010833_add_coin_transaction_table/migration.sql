-- CreateEnum
CREATE TYPE "CoinTransactionType" AS ENUM ('EARN', 'SLEEP_REWARD', 'SLEEP_STREAK', 'ACHIEVEMENT', 'DEPOSIT', 'SPEND', 'REFUND', 'ADMIN_ADJUSTMENT', 'PROMOTION');

-- CreateTable
CREATE TABLE "coin_transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_coin_id" TEXT NOT NULL,
    "reference_id" TEXT,
    "type" "CoinTransactionType" NOT NULL,
    "balance_before" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "balance_after" INTEGER NOT NULL,
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coin_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coin_transactions_user_id_idx" ON "coin_transactions"("user_id");

-- CreateIndex
CREATE INDEX "coin_transactions_reference_id_idx" ON "coin_transactions"("reference_id");

-- AddForeignKey
ALTER TABLE "coin_transactions" ADD CONSTRAINT "coin_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin_transactions" ADD CONSTRAINT "coin_transactions_user_coin_id_fkey" FOREIGN KEY ("user_coin_id") REFERENCES "user_coins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
