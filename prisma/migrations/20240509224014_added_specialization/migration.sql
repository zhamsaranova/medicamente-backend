/*
  Warnings:

  - You are about to drop the column `specializations` on the `Expert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expert" DROP COLUMN "specializations";

-- CreateTable
CREATE TABLE "Specialization" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExpertToSpecialization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExpertToSpecialization_AB_unique" ON "_ExpertToSpecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpertToSpecialization_B_index" ON "_ExpertToSpecialization"("B");

-- AddForeignKey
ALTER TABLE "_ExpertToSpecialization" ADD CONSTRAINT "_ExpertToSpecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "Expert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpertToSpecialization" ADD CONSTRAINT "_ExpertToSpecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "Specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
