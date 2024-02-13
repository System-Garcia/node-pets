/*
  Warnings:

  - Made the column `missingAt` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "missingAt" SET NOT NULL;
