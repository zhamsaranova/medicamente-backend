-- AlterTable
ALTER TABLE "RecordTime" ALTER COLUMN "time" SET NOT NULL,
ALTER COLUMN "time" DROP DEFAULT,
ALTER COLUMN "time" SET DATA TYPE TEXT;
