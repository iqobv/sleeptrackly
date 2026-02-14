-- CreateEnum
CREATE TYPE "AcquiredFrom" AS ENUM ('BUNDLE', 'REWARD', 'PURCHASE', 'PROMOTION', 'ADMIN_GRANT');

-- CreateTable
CREATE TABLE "user_inventories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "is_equipped" BOOLEAN NOT NULL DEFAULT false,
    "acquired_from" "AcquiredFrom" NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_inventories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_inventories_user_id_item_id_key" ON "user_inventories"("user_id", "item_id");

-- AddForeignKey
ALTER TABLE "user_inventories" ADD CONSTRAINT "user_inventories_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_inventories" ADD CONSTRAINT "user_inventories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
