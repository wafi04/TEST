/*
  Warnings:

  - You are about to drop the column `color` on the `CartItem` table. All the data in the column will be lost.
  - Made the column `size` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `color`,
    MODIFY `size` VARCHAR(191) NOT NULL;
