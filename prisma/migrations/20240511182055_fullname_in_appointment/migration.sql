/*
  Warnings:

  - You are about to drop the column `lastName` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "lastName",
DROP COLUMN "name",
ADD COLUMN     "fullname" TEXT NOT NULL;
