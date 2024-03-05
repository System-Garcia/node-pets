/*
  Warnings:

  - You are about to drop the column `petId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `rewardId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_petId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "petId",
ADD COLUMN     "rewardId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
