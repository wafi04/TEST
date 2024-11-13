/*
  Warnings:

  - Added the required column `total` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `CartItem` ADD COLUMN `total` DOUBLE NOT NULL;
