/*
  Warnings:

  - A unique constraint covering the columns `[time]` on the table `RecordTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RecordTime_time_key" ON "RecordTime"("time");
