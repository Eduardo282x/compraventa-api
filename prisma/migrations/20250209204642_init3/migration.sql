/*
  Warnings:

  - You are about to drop the column `empId` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `fechCrea` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `pagNom` on the `pago` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ventadetalle` table. All the data in the column will be lost.
  - Added the required column `cliApellido` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cliPassword` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank` to the `Pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identify` to the `Pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Pago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `empId`,
    DROP COLUMN `fechCrea`,
    DROP COLUMN `status`,
    ADD COLUMN `cliApellido` VARCHAR(191) NOT NULL,
    ADD COLUMN `cliPassword` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pago` DROP COLUMN `pagNom`,
    ADD COLUMN `bank` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `identify` VARCHAR(191) NOT NULL,
    ADD COLUMN `owner` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `venta` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `ventadetalle` DROP COLUMN `status`;

-- CreateTable
CREATE TABLE `Pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliId` INTEGER NOT NULL,
    `pending` BOOLEAN NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prodId` INTEGER NOT NULL,
    `cant` INTEGER NOT NULL,
    `cliId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_sucId_fkey` FOREIGN KEY (`sucId`) REFERENCES `Sucursal`(`sucId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_cliId_fkey` FOREIGN KEY (`cliId`) REFERENCES `Cliente`(`cliId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_cliId_fkey` FOREIGN KEY (`cliId`) REFERENCES `Cliente`(`cliId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_prodId_fkey` FOREIGN KEY (`prodId`) REFERENCES `Producto`(`prodId`) ON DELETE RESTRICT ON UPDATE CASCADE;
