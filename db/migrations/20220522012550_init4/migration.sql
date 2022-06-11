/*
  Warnings:

  - You are about to drop the column `emailId` on the `comment` table. All the data in the column will be lost.
  - Added the required column `email` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_emailId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `emailId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
