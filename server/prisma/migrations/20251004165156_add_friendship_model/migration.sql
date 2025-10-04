-- CreateEnum
CREATE TYPE "public"."FriendshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED');

-- CreateTable
CREATE TABLE "public"."friendships" (
    "id" TEXT NOT NULL,
    "requester_id" TEXT NOT NULL,
    "addressee_id" TEXT NOT NULL,
    "status" "public"."FriendshipStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friendships_id_key" ON "public"."friendships"("id");

-- CreateIndex
CREATE UNIQUE INDEX "friendships_requester_id_addressee_id_key" ON "public"."friendships"("requester_id", "addressee_id");

-- AddForeignKey
ALTER TABLE "public"."friendships" ADD CONSTRAINT "friendships_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."friendships" ADD CONSTRAINT "friendships_addressee_id_fkey" FOREIGN KEY ("addressee_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
