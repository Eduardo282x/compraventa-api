import { Injectable } from '@nestjs/common';
import { baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MainloadService {

    constructor(private prismaService: PrismaService) { }

    async loadBaseData(): Promise<DtoBaseResponse> {
        const monedas = [
            { currency: 'Dólar', symbol: 'USD' },
            { currency: 'Peso Colombiano', symbol: 'COP' },
            { currency: 'Bolívar', symbol: 'VES' }
        ];
        await this.prismaService.moneda.createMany({ data: monedas });

        const unidades = [
            { unit: 'Kilogramo' },
            { unit: 'Gramo' },
            { unit: 'Litro' },
            { unit: 'Miligramo' },
            { unit: 'Mililitro' },
        ];
        await this.prismaService.unidad.createMany({ data: unidades });

        await this.prismaService.empresa.create({
            data: {
                companyName: 'Servimar',
                companyRuc: '1234567',
                companyPhone: '0536271823',
                companyEmail: 'servimar@gmail.com',
                companyAddress: 'Direccion',
            }
        });

        await this.prismaService.sucursal.createMany({
            data: [
                { companyId: 1, nombre: 'Sucursal 1' },
                { companyId: 1, nombre: 'Sucursal 2' },
            ]
        });

        await this.prismaService.rol.createMany({
            data: [
                { rol: 'Administrador' },
                { rol: 'Vendedor' },
                { rol: 'Gerente' },
            ]
        });

        await this.prismaService.usuario.create({
            data: {
                sucId: 1,
                rolId: 1,
                name: 'admin',
                lastName: 'admin',
                identify: '12345678',
                email: 'admin@gmail.com',
                password: 'admin',
            }
        });

        await this.prismaService.category.createMany({
            data: [
                { category: "Analgésicos" },
                { category: "Antibióticos" },
                { category: "Vacunas" },
                { category: "Antihipertensivos" },
                { category: "Antidiabéticos" },
                { category: "Antiinflamatorios" },
                { category: "Antihistamínicos" }
            ]
        });

        await this.prismaService.proveedor.createMany({
            data: [
                {
                    name: 'Proveedor 1',
                    ruc: '12345678',
                    phone: '8651238123',
                    address: 'direccion Proveedor 1',
                    email: 'proveedor@gmail.com',
                }
            ]
        });

        await this.prismaService.store.createMany({
            data: [
                { categoryId: 3, name: "Vaxigrip", description: "Vacuna contra la influenza.", price: 50, amount: 90, img: "https://example.com/vaxigrip.jpg", expirationDate: new Date("2025-12-11"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 5, name: "Implanon", description: "Implante anticonceptivo subdérmico.", price: 150, amount: 85, img: "https://example.com/implanon.jpg", expirationDate: new Date("2025-12-12"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 3, name: "Typhim Vi", description: "Vacuna contra la fiebre tifoidea.", price: 60, amount: 75, img: "https://example.com/typhim-vi.jp", expirationDate: new Date("2025-12-1",), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 2, name: "Docetaxel", description: "Quimioterapéutico utilizado en el tratamiento del cáncer.", price: 500, amount: 50, img: "https://example.com/docetaxel.jpg", expirationDate: new Date("2025-12-14"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 3, name: "Stamaril", description: "Vacuna contra la fiebre amarilla.", price: 55, amount: 65, img: "https://example.com/stamaril.jpg", expirationDate: new Date("2025-12-15"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 5, name: "Saxenda", description: "Medicamento para el control del peso.", price: 400, amount: 45, img: "https://example.com/saxenda.jpg", expirationDate: new Date("2025-12-16"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 3, name: "Hexaxim", description: "Vacuna hexavalente para protección infantil.", price: 90, amount: 80, img: "https://example.com/hexaxim.jpg", expirationDate: new Date("2025-12-17"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 2, name: "Timoglobulina", description: "Inmunosupresor para trasplantes de órganos.", price: 600, amount: 30, img: "https://example.com/timoglobulina.jpg", expirationDate: new Date("2025-12-18"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 5, name: "Levonogestrel", description: "Anticonceptivo de emergencia.", price: 20, amount: 100, img: "https://example.com/levonogestrel.jpg", expirationDate: new Date("2025-12-19"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 3, name: "Menactra", description: "Vacuna contra la meningitis meningocócica.", price: 80, amount: 70, img: "https://example.com/menactra.jpg", expirationDate: new Date("2025-12-20"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 },
                { categoryId: 2, name: "Cromus", description: "Tratamiento para enfermedades inflamatorias crónicas.", price: 120, amount: 60, img: "https://example.com/cromus.jpg", expirationDate: new Date("2025-12-21"), providerId: 1, currencyId: 1, unit: '1', unitId: 1 }
            ]
        })

        await this.prismaService.producto.createMany({
            data: [
                { storeId: 1, sucursalId: 1, amount: 45 },
                { storeId: 1, sucursalId: 2, amount: 45 },
                { storeId: 2, sucursalId: 1, amount: 40 },
                { storeId: 2, sucursalId: 2, amount: 40 },
                { storeId: 3, sucursalId: 1, amount: 35 },
                { storeId: 3, sucursalId: 2, amount: 35 },
                { storeId: 4, sucursalId: 1, amount: 25 },
                { storeId: 4, sucursalId: 2, amount: 25 },
                { storeId: 5, sucursalId: 1, amount: 30 },
                { storeId: 5, sucursalId: 2, amount: 30 },
                { storeId: 6, sucursalId: 1, amount: 20 },
                { storeId: 6, sucursalId: 2, amount: 20 },
                { storeId: 7, sucursalId: 1, amount: 40 },
                { storeId: 7, sucursalId: 2, amount: 40 },
                { storeId: 8, sucursalId: 1, amount: 15 },
                { storeId: 8, sucursalId: 2, amount: 15 },
                { storeId: 9, sucursalId: 1, amount: 40 },
                { storeId: 9, sucursalId: 2, amount: 40 },
                { storeId: 10, sucursalId: 1, amount: 30 },
                { storeId: 10, sucursalId: 2, amount: 30 },
            ]
        });

        const clientes = Array.from({ length: 10 }, (_, i) => ({
            clientName: `Cliente ${i + 1}`,
            clientLastName: `Cliente Apellido ${i + 1}`,
            clientRif: `${12345678 + i}`,
            clientPhone: `0412${2345678 + i}`,
            clientAddress: `Calle ${i + 1}`,
            clientEmail: `cliente${i + 1}@correo.com`,
            clientPassword: `1234`,
        }));
        await this.prismaService.cliente.createMany({ data: clientes });

        await this.prismaService.paymentMethods.create({
            data: {
                bank: 'Banco',
                identify: '12345678',
                email: 'correo@gmail.com',
                phone: '12345678',
                owner: 'Propietario',
                type: 'transferencia',
                currencyId: 1,
            }
        })

        baseResponse.message = 'Datos base cargados correctamente.';
        return baseResponse;
    }
}
