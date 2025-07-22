-- CreateTable
CREATE TABLE `racks` (
    `id` VARCHAR(191) NOT NULL,
    `rack` VARCHAR(191) NOT NULL,
    `floor` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipments` (
    `id` VARCHAR(191) NOT NULL,
    `hostname` VARCHAR(191) NULL,
    `brand` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `serialnumber` VARCHAR(191) NOT NULL,
    `function` ENUM('Server', 'Switch', 'Firewall', 'GGSN', 'Discovery') NULL,
    `category` ENUM('Server', 'Switch', 'Firewall', 'GGSN', 'Discovery') NULL,
    `group` ENUM('CORE', 'IN', 'IT') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maintenances` (
    `id` VARCHAR(191) NOT NULL,
    `equipmentId` VARCHAR(191) NULL,
    `status` ENUM('NEW', 'REVISION', 'NOTFOUND', 'DUPLICATE', 'NOTVALIDATE', 'DISMANTLE', 'ON') NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `maintenances` ADD CONSTRAINT `maintenances_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `equipments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
