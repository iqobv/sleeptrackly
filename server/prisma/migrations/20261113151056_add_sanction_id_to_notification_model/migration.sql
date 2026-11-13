-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "sanction_id" TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sanction_id_fkey" FOREIGN KEY ("sanction_id") REFERENCES "user_sanctions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
