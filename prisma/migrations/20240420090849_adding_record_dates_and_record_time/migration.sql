-- AlterTable
ALTER TABLE "Expert" ADD COLUMN     "recordDates" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "RecordTime" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "time" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "RecordTime_pkey" PRIMARY KEY ("id")
);
