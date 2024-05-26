/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Price` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_serviceId_fkey";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "serviceId";

-- CreateTable
CREATE TABLE "ServicesOnPrices" (
    "priceId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "ServicesOnPrices_pkey" PRIMARY KEY ("priceId","serviceId")
);

-- AddForeignKey
ALTER TABLE "ServicesOnPrices" ADD CONSTRAINT "ServicesOnPrices_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnPrices" ADD CONSTRAINT "ServicesOnPrices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
