-- CreateTable
CREATE TABLE "promotion_usages" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "promotion_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotion_usages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "max_uses" INTEGER DEFAULT 1,
    "used_count" INTEGER DEFAULT 0,
    "expires_at" TIMESTAMP(3),
    "coins_reward" INTEGER DEFAULT 0,
    "product_id_reward" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "promotion_usages_user_id_promotion_id_key" ON "promotion_usages"("user_id", "promotion_id");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_alias_key" ON "promotions"("alias");

-- AddForeignKey
ALTER TABLE "promotion_usages" ADD CONSTRAINT "promotion_usages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_usages" ADD CONSTRAINT "promotion_usages_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_product_id_reward_fkey" FOREIGN KEY ("product_id_reward") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
