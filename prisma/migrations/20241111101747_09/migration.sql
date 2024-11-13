/*
  Warnings:

  - You are about to drop the column `saldo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isCheckout` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Purchase` DROP FOREIGN KEY `Purchase_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Purchase` DROP FOREIGN KEY `Purchase_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `Sale_buyerId_fkey`;

-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `Sale_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `Sale_sellerId_fkey`;

-- AlterTable
ALTER TABLE `CartItem` ADD COLUMN `isCheckout` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `saldo`;

-- DropTable
DROP TABLE `Purchase`;

-- DropTable
DROP TABLE `Sale`;
