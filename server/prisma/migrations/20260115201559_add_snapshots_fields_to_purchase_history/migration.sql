/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `purchase_histories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name_snapshot` to the `purchase_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_snapshot` to the `purchase_histories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."coin_transactions" DROP CONSTRAINT "coin_transactions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."purchase_histories" DROP CONSTRAINT "purchase_histories_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."purchase_histories" DROP CONSTRAINT "purchase_histories_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."purchase_histories" DROP CONSTRAINT "purchase_histories_user_id_fkey";

-- AlterTable
ALTER TABLE "purchase_histories" ADD COLUMN     "name_snapshot" JSONB NOT NULL,
ADD COLUMN     "price_snapshot" INTEGER NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "product_id" DROP NOT NULL,
ALTER COLUMN "transaction_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "purchase_histories_transaction_id_key" ON "purchase_histories"("transaction_id");

-- CreateIndex
CREATE INDEX "purchase_histories_user_id_product_id_idx" ON "purchase_histories"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "coin_transactions" ADD CONSTRAINT "coin_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_histories" ADD CONSTRAINT "purchase_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_histories" ADD CONSTRAINT "purchase_histories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_histories" ADD CONSTRAINT "purchase_histories_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "coin_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
