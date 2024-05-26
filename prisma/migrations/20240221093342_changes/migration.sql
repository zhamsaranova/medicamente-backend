/*
  Warnings:

  - You are about to drop the `ServicesOnPrices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServicesOnPrices" DROP CONSTRAINT "ServicesOnPrices_priceId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesOnPrices" DROP CONSTRAINT "ServicesOnPrices_serviceId_fkey";

-- DropTable
DROP TABLE "ServicesOnPrices";

-- CreateTable
CREATE TABLE "_PriceToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PriceToService_AB_unique" ON "_PriceToService"("A", "B");

-- CreateIndex
CREATE INDEX "_PriceToService_B_index" ON "_PriceToService"("B");

-- AddForeignKey
ALTER TABLE "_PriceToService" ADD CONSTRAINT "_PriceToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PriceToService" ADD CONSTRAINT "_PriceToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
