import { Injectable } from '@nestjs/common';
import { baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MainloadService {

    constructor(private prismaService: PrismaService) { }

    async loadBaseData(): Promise<DtoBaseResponse> {
        // 1. Moneda
        const monedas = [
            { monNom: 'Dólar', status: true },
            { monNom: 'Peso Colombiano', status: true },
            { monNom: 'Bolívar', status: true }
        ];
        await this.prismaService.moneda.createMany({ data: monedas });

        // 2. Unidad
        const unidades = [
            { undNom: 'Unidad', status: true },
            { undNom: 'Kilogramo', status: true },
            { undNom: 'Litro', status: true },
            { undNom: 'Metro', status: true },
            { undNom: 'Caja', status: true },
            { undNom: 'Paquete', status: true },
            { undNom: 'Docena', status: true },
            { undNom: 'Tonelada', status: true },
            { undNom: 'Galón', status: true },
            { undNom: 'Mililitro', status: true },
        ];
        await this.prismaService.unidad.createMany({ data: unidades });

        // 3. Empresa
        const empresas = Array.from({ length: 10 }, (_, i) => ({
            empNom: `Empresa ${i + 1}`,
            empRuc: `J-${12345678 + i}`,
            empCorreo: `contacto@empresa${i + 1}.com`,
            empTelf: `0412${1234567 + i}`,
            empDirecc: `Dirección ${i + 1}`,
            status: true,
        }));
        await this.prismaService.empresa.createMany({ data: empresas });

        // 4. Sucursal
        const sucursales = Array.from({ length: 10 }, (_, i) => ({
            empId: (i % 5) + 1, // Relaciona las sucursales con las primeras 5 empresas
            sucNom: `Sucursal ${i + 1}`,
            status: true,
        }));
        await this.prismaService.sucursal.createMany({ data: sucursales });

        // 5. Proveedor
        const proveedores = Array.from({ length: 10 }, (_, i) => ({
            empId: (i % 5) + 1, // Relaciona los proveedores con las primeras 5 empresas
            provNom: `Proveedor ${i + 1}`,
            provRuc: `G-${12345678 + i}`,
            provTelf: `0424${1234567 + i}`,
            provDirecc: `Dirección Proveedor ${i + 1}`,
            provCorreo: `proveedor${i + 1}@correo.com`,
            status: true,
        }));
        await this.prismaService.proveedor.createMany({ data: proveedores });

        // 6. Categoría
        await this.prismaService.categoria.createMany({
            data: [
                { sucId: 1, nombre: "Analgésicos" },
                { sucId: 1, nombre: "Antibióticos" },
                { sucId: 1, nombre: "Vacunas" },
                { sucId: 1, nombre: "Antihipertensivos" },
                { sucId: 1, nombre: "Antidiabéticos" },
                { sucId: 1, nombre: "Antiinflamatorios" },
                { sucId: 1, nombre: "Antihistamínicos" }
            ]
        });

        // 7. Producto
        await this.prismaService.producto.createMany({
            data: [
                { catId: 3, prodNom: "Vaxigrip", prodDescrip: "Vacuna contra la influenza.", prodPcompra: 50, prodPventa: 70, prodStock: 90, prodImg: "https://example.com/vaxigrip.jpg", prodFechaven: new Date("2025-12-11"), status: true },
                { catId: 5, prodNom: "Implanon", prodDescrip: "Implante anticonceptivo subdérmico.", prodPcompra: 150, prodPventa: 200, prodStock: 85, prodImg: "https://example.com/implanon.jpg", prodFechaven: new Date("2025-12-12"), status: true },
                { catId: 3, prodNom: "Typhim Vi", prodDescrip: "Vacuna contra la fiebre tifoidea.", prodPcompra: 60, prodPventa: 80, prodStock: 75, prodImg: "https://example.com/typhim-vi.jp", prodFechaven: new Date("2025-12-1",), status: true },
                { catId: 2, prodNom: "Docetaxel", prodDescrip: "Quimioterapéutico utilizado en el tratamiento del cáncer.", prodPcompra: 500, prodPventa: 700, prodStock: 50, prodImg: "https://example.com/docetaxel.jpg", prodFechaven: new Date("2025-12-14"), status: true },
                { catId: 3, prodNom: "Stamaril", prodDescrip: "Vacuna contra la fiebre amarilla.", prodPcompra: 55, prodPventa: 75, prodStock: 65, prodImg: "https://example.com/stamaril.jpg", prodFechaven: new Date("2025-12-15"), status: true },
                { catId: 5, prodNom: "Saxenda", prodDescrip: "Medicamento para el control del peso.", prodPcompra: 400, prodPventa: 500, prodStock: 45, prodImg: "https://example.com/saxenda.jpg", prodFechaven: new Date("2025-12-16"), status: true },
                { catId: 3, prodNom: "Hexaxim", prodDescrip: "Vacuna hexavalente para protección infantil.", prodPcompra: 90, prodPventa: 120, prodStock: 80, prodImg: "https://example.com/hexaxim.jpg", prodFechaven: new Date("2025-12-17"), status: true },
                { catId: 2, prodNom: "Timoglobulina", prodDescrip: "Inmunosupresor para trasplantes de órganos.", prodPcompra: 600, prodPventa: 800, prodStock: 30, prodImg: "https://example.com/timoglobulina.jpg", prodFechaven: new Date("2025-12-18"), status: true },
                { catId: 5, prodNom: "Levonogestrel", prodDescrip: "Anticonceptivo de emergencia.", prodPcompra: 20, prodPventa: 30, prodStock: 100, prodImg: "https://example.com/levonogestrel.jpg", prodFechaven: new Date("2025-12-19"), status: true },
                { catId: 3, prodNom: "Menactra", prodDescrip: "Vacuna contra la meningitis meningocócica.", prodPcompra: 80, prodPventa: 100, prodStock: 70, prodImg: "https://example.com/menactra.jpg", prodFechaven: new Date("2025-12-20"), status: true },
                { catId: 2, prodNom: "Cromus", prodDescrip: "Tratamiento para enfermedades inflamatorias crónicas.", prodPcompra: 120, prodPventa: 160, prodStock: 60, prodImg: "https://example.com/cromus.jpg", prodFechaven: new Date("2025-12-21"), status: true }

            ]
        });

        // 8. Rol
        const roles = [
            { rol: 'Administrador' },
            { rol: 'Vendedor' },
            { rol: 'Cajero' },
            { rol: 'Supervisor' },
            { rol: 'Cliente' },
        ];
        await this.prismaService.rol.createMany({ data: roles });

        // 9. Usuario
        await this.prismaService.usuario.create({
            data: {
                sucId: 1,
                rolId: 1,
                usuNombre: 'Admin',
                usuApellido: 'Admin',
                usuCorreo: 'admin@gmail.com',
                usuPassword: 'admin',
                status: true,
            }
        });

        // 10. Cliente
        const clientes = Array.from({ length: 10 }, (_, i) => ({
            cliNombre: `Cliente ${i + 1}`,
            cliApellido: `Cliente Apellido ${i + 1}`,
            cliRif: `${12345678 + i}`,
            cliTelefono: `0412${2345678 + i}`,
            cliDireccion: `Calle ${i + 1}`,
            cliCorreo: `cliente${i + 1}@correo.com`,
            cliPassword: `1234`,
        }));
        await this.prismaService.cliente.createMany({ data: clientes });

        baseResponse.message = 'Datos base cargados correctamente.';
        return baseResponse;
    }
}
