/*
  Warnings:

  - Made the column `publishDate` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "publishDate" SET NOT NULL,
ALTER COLUMN "publishDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "publishDate" SET DATA TYPE TIMESTAMP(3);
