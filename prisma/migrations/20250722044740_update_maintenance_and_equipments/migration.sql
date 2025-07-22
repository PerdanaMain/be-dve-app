/*
  Warnings:

  - You are about to alter the column `function` on the `equipments` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `category` on the `equipments` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to alter the column `group` on the `equipments` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to alter the column `status` on the `maintenances` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `equipments` MODIFY `function` VARCHAR(191) NULL,
    MODIFY `category` VARCHAR(191) NULL,
    MODIFY `group` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `maintenances` MODIFY `status` VARCHAR(191) NULL;
