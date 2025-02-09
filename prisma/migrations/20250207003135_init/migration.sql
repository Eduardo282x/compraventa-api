-- CreateTable
CREATE TABLE "CompraDetalle" (
    "detcId" SERIAL NOT NULL,
    "comprId" INTEGER NOT NULL,
    "prodId" INTEGER NOT NULL,
    "prodPcompra" DECIMAL(18,2) NOT NULL,
    "detcCant" INTEGER NOT NULL,
    "detcTotal" DECIMAL(18,2) NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CompraDetalle_pkey" PRIMARY KEY ("detcId")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "catId" SERIAL NOT NULL,
    "sucId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("catId")
);

-- CreateTable
CREATE TABLE "Producto" (
    "prodId" SERIAL NOT NULL,
    "catId" INTEGER NOT NULL,
    "prodNom" TEXT NOT NULL,
    "prodDescrip" TEXT,
    "prodPcompra" DECIMAL(18,2) NOT NULL,
    "prodPventa" DECIMAL(18,2) NOT NULL,
    "prodStock" INTEGER NOT NULL DEFAULT 0,
    "prodFechaven" TIMESTAMP(3) NOT NULL,
    "prodImg" TEXT,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "MonedaMonId" INTEGER,
    "SucursalSucId" INTEGER,
    "UnidadUndId" INTEGER,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("prodId")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "cliId" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "cliNombre" TEXT NOT NULL,
    "cliRif" TEXT NOT NULL,
    "cliTelefono" TEXT NOT NULL,
    "cliDireccion" TEXT NOT NULL,
    "cliCorreo" TEXT NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cliId")
);

-- CreateTable
CREATE TABLE "Compra" (
    "comprId" SERIAL NOT NULL,
    "provId" INTEGER NOT NULL,
    "comprSubtotal" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "comprIgv" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "comprTotal" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "PagoPagId" INTEGER,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("comprId")
);

-- CreateTable
CREATE TABLE "Documento" (
    "docId" SERIAL NOT NULL,
    "docNombre" TEXT NOT NULL,
    "docTipo" TEXT NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("docId")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "empId" SERIAL NOT NULL,
    "empNom" TEXT NOT NULL,
    "empRuc" TEXT NOT NULL,
    "empCorreo" TEXT NOT NULL,
    "empTelf" TEXT NOT NULL,
    "empDirecc" TEXT NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("empId")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "provId" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "provNom" TEXT NOT NULL,
    "provRuc" VARCHAR(15) NOT NULL,
    "provTelf" TEXT NOT NULL,
    "provDirecc" TEXT NOT NULL,
    "provCorreo" TEXT NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("provId")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "sucId" INTEGER NOT NULL,
    "rolId" INTEGER NOT NULL,
    "usuNombre" TEXT NOT NULL,
    "usuApellido" TEXT NOT NULL,
    "usuCorreo" TEXT NOT NULL,
    "usuPassword" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VentaDetalle" (
    "detvId" SERIAL NOT NULL,
    "ventId" INTEGER NOT NULL,
    "prodId" INTEGER NOT NULL,
    "prodPventa" DECIMAL(18,2) NOT NULL,
    "detvCant" INTEGER NOT NULL,
    "detvTotal" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "VentaDetalle_pkey" PRIMARY KEY ("detvId")
);

-- CreateTable
CREATE TABLE "Venta" (
    "ventId" SERIAL NOT NULL,
    "cliId" INTEGER NOT NULL,
    "ventSubtotal" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "ventIgv" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "ventTotal" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DocumentoDocId" INTEGER,
    "MonedaMonId" INTEGER,
    "PagoPagId" INTEGER,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("ventId")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" SERIAL NOT NULL,
    "cliId" INTEGER NOT NULL,
    "pending" BOOLEAN NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrito" (
    "id" SERIAL NOT NULL,
    "prodId" INTEGER NOT NULL,
    "cant" INTEGER NOT NULL,
    "cliId" INTEGER NOT NULL,

    CONSTRAINT "Carrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "pagId" SERIAL NOT NULL,
    "bank" TEXT NOT NULL,
    "identify" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("pagId")
);

-- CreateTable
CREATE TABLE "Sucursal" (
    "sucId" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "sucNom" TEXT NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("sucId")
);

-- CreateTable
CREATE TABLE "Moneda" (
    "monId" SERIAL NOT NULL,
    "monNom" TEXT NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Moneda_pkey" PRIMARY KEY ("monId")
);

-- CreateTable
CREATE TABLE "Unidad" (
    "undId" SERIAL NOT NULL,
    "undNom" TEXT NOT NULL,
    "fechCrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Unidad_pkey" PRIMARY KEY ("undId")
);

-- AddForeignKey
ALTER TABLE "CompraDetalle" ADD CONSTRAINT "CompraDetalle_comprId_fkey" FOREIGN KEY ("comprId") REFERENCES "Compra"("comprId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompraDetalle" ADD CONSTRAINT "CompraDetalle_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Producto"("prodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_sucId_fkey" FOREIGN KEY ("sucId") REFERENCES "Sucursal"("sucId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Categoria"("catId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_MonedaMonId_fkey" FOREIGN KEY ("MonedaMonId") REFERENCES "Moneda"("monId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_SucursalSucId_fkey" FOREIGN KEY ("SucursalSucId") REFERENCES "Sucursal"("sucId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_UnidadUndId_fkey" FOREIGN KEY ("UnidadUndId") REFERENCES "Unidad"("undId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_provId_fkey" FOREIGN KEY ("provId") REFERENCES "Proveedor"("provId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_PagoPagId_fkey" FOREIGN KEY ("PagoPagId") REFERENCES "Pago"("pagId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_sucId_fkey" FOREIGN KEY ("sucId") REFERENCES "Sucursal"("sucId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaDetalle" ADD CONSTRAINT "VentaDetalle_ventId_fkey" FOREIGN KEY ("ventId") REFERENCES "Venta"("ventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaDetalle" ADD CONSTRAINT "VentaDetalle_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Producto"("prodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_cliId_fkey" FOREIGN KEY ("cliId") REFERENCES "Cliente"("cliId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_DocumentoDocId_fkey" FOREIGN KEY ("DocumentoDocId") REFERENCES "Documento"("docId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_MonedaMonId_fkey" FOREIGN KEY ("MonedaMonId") REFERENCES "Moneda"("monId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_PagoPagId_fkey" FOREIGN KEY ("PagoPagId") REFERENCES "Pago"("pagId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_cliId_fkey" FOREIGN KEY ("cliId") REFERENCES "Cliente"("cliId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_cliId_fkey" FOREIGN KEY ("cliId") REFERENCES "Cliente"("cliId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Producto"("prodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sucursal" ADD CONSTRAINT "Sucursal_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;
