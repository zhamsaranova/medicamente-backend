/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Expert` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expert" DROP CONSTRAINT "Expert_serviceId_fkey";

-- AlterTable
ALTER TABLE "Expert" DROP COLUMN "serviceId";

-- CreateTable
CREATE TABLE "_ExpertToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExpertToService_AB_unique" ON "_ExpertToService"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpertToService_B_index" ON "_ExpertToService"("B");

-- AddForeignKey
ALTER TABLE "_ExpertToService" ADD CONSTRAINT "_ExpertToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Expert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpertToService" ADD CONSTRAINT "_ExpertToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
