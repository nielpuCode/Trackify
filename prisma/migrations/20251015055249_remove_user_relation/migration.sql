/*
  Warnings:

  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropIndex
DROP INDEX `Task_userId_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `userId`;
