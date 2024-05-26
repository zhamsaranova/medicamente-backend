-- AlterTable
ALTER TABLE "Expert" ADD COLUMN     "specializations" TEXT[],
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "rank" SET DEFAULT 1;
