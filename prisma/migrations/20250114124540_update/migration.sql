-- CreateTable
CREATE TABLE `CompraDetalle` (
    `detcId` INTEGER NOT NULL AUTO_INCREMENT,
    `comprId` INTEGER NOT NULL,
    `prodId` INTEGER NOT NULL,
    `prodPcompra` DECIMAL(18, 2) NOT NULL,
    `detcCant` INTEGER NOT NULL,
    `detcTotal` DECIMAL(18, 2) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`detcId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VentaDetalle` (
    `detvId` INTEGER NOT NULL AUTO_INCREMENT,
    `ventId` INTEGER NOT NULL,
    `prodId` INTEGER NOT NULL,
    `prodPventa` DECIMAL(18, 2) NOT NULL,
    `detvCant` INTEGER NOT NULL,
    `detvTotal` DECIMAL(18, 2) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`detvId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `catId` INTEGER NOT NULL AUTO_INCREMENT,
    `sucId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`catId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `cliId` INTEGER NOT NULL AUTO_INCREMENT,
    `empId` INTEGER NOT NULL,
    `cliNombre` VARCHAR(191) NOT NULL,
    `cliRif` VARCHAR(191) NOT NULL,
    `cliTelefono` VARCHAR(191) NOT NULL,
    `cliDireccion` VARCHAR(191) NOT NULL,
    `cliCorreo` VARCHAR(191) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`cliId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `comprId` INTEGER NOT NULL AUTO_INCREMENT,
    `provId` INTEGER NOT NULL,
    `comprSubtotal` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `comprIgv` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `comprTotal` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,
    `PagoPagId` INTEGER NULL,

    PRIMARY KEY (`comprId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `docId` INTEGER NOT NULL AUTO_INCREMENT,
    `docNombre` VARCHAR(191) NOT NULL,
    `docTipo` VARCHAR(191) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`docId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `empId` INTEGER NOT NULL AUTO_INCREMENT,
    `empNom` VARCHAR(191) NOT NULL,
    `empRuc` VARCHAR(191) NOT NULL,
    `empCorreo` VARCHAR(191) NOT NULL,
    `empTelf` VARCHAR(191) NOT NULL,
    `empDirecc` VARCHAR(191) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`empId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedor` (
    `provId` INTEGER NOT NULL AUTO_INCREMENT,
    `empId` INTEGER NOT NULL,
    `provNom` VARCHAR(191) NOT NULL,
    `provRuc` VARCHAR(15) NOT NULL,
    `provTelf` VARCHAR(191) NOT NULL,
    `provDirecc` VARCHAR(191) NOT NULL,
    `provCorreo` VARCHAR(191) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`provId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sucId` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,
    `usuNombre` VARCHAR(191) NOT NULL,
    `usuApellido` VARCHAR(191) NOT NULL,
    `usuCorreo` VARCHAR(191) NOT NULL,
    `usuPassword` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `prodId` INTEGER NOT NULL AUTO_INCREMENT,
    `catId` INTEGER NOT NULL,
    `prodNom` VARCHAR(191) NOT NULL,
    `prodDescrip` LONGTEXT NULL,
    `prodPcompra` DECIMAL(18, 2) NOT NULL,
    `prodPventa` DECIMAL(18, 2) NOT NULL,
    `prodStock` INTEGER NOT NULL DEFAULT 0,
    `prodFechaven` DATETIME(3) NOT NULL,
    `prodImg` LONGTEXT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,
    `MonedaMonId` INTEGER NULL,
    `SucursalSucId` INTEGER NULL,
    `UnidadUndId` INTEGER NULL,

    PRIMARY KEY (`prodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venta` (
    `ventId` INTEGER NOT NULL AUTO_INCREMENT,
    `cliId` INTEGER NOT NULL,
    `ventSubtotal` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `ventIgv` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `ventTotal` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,
    `DocumentoDocId` INTEGER NULL,
    `MonedaMonId` INTEGER NULL,
    `PagoPagId` INTEGER NULL,

    PRIMARY KEY (`ventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `pagId` INTEGER NOT NULL AUTO_INCREMENT,
    `pagNom` VARCHAR(191) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`pagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal` (
    `sucId` INTEGER NOT NULL AUTO_INCREMENT,
    `empId` INTEGER NOT NULL,
    `sucNom` VARCHAR(191) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`sucId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moneda` (
    `monId` INTEGER NOT NULL AUTO_INCREMENT,
    `monNom` VARCHAR(191) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`monId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unidad` (
    `undId` INTEGER NOT NULL AUTO_INCREMENT,
    `undNom` VARCHAR(191) NOT NULL,
    `fechCrea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`undId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CompraDetalle` ADD CONSTRAINT `CompraDetalle_comprId_fkey` FOREIGN KEY (`comprId`) REFERENCES `Compra`(`comprId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompraDetalle` ADD CONSTRAINT `CompraDetalle_prodId_fkey` FOREIGN KEY (`prodId`) REFERENCES `Producto`(`prodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VentaDetalle` ADD CONSTRAINT `VentaDetalle_ventId_fkey` FOREIGN KEY (`ventId`) REFERENCES `Venta`(`ventId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VentaDetalle` ADD CONSTRAINT `VentaDetalle_prodId_fkey` FOREIGN KEY (`prodId`) REFERENCES `Producto`(`prodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_provId_fkey` FOREIGN KEY (`provId`) REFERENCES `Proveedor`(`provId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_PagoPagId_fkey` FOREIGN KEY (`PagoPagId`) REFERENCES `Pago`(`pagId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_sucId_fkey` FOREIGN KEY (`sucId`) REFERENCES `Sucursal`(`sucId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_catId_fkey` FOREIGN KEY (`catId`) REFERENCES `Categoria`(`catId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_MonedaMonId_fkey` FOREIGN KEY (`MonedaMonId`) REFERENCES `Moneda`(`monId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_SucursalSucId_fkey` FOREIGN KEY (`SucursalSucId`) REFERENCES `Sucursal`(`sucId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_UnidadUndId_fkey` FOREIGN KEY (`UnidadUndId`) REFERENCES `Unidad`(`undId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_cliId_fkey` FOREIGN KEY (`cliId`) REFERENCES `Cliente`(`cliId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_DocumentoDocId_fkey` FOREIGN KEY (`DocumentoDocId`) REFERENCES `Documento`(`docId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_MonedaMonId_fkey` FOREIGN KEY (`MonedaMonId`) REFERENCES `Moneda`(`monId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_PagoPagId_fkey` FOREIGN KEY (`PagoPagId`) REFERENCES `Pago`(`pagId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sucursal` ADD CONSTRAINT `Sucursal_empId_fkey` FOREIGN KEY (`empId`) REFERENCES `Empresa`(`empId`) ON DELETE RESTRICT ON UPDATE CASCADE;
