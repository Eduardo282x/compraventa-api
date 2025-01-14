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
            { monNom: 'Euro', status: true },
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
        const categorias = Array.from({ length: 10 }, (_, i) => ({
            sucId: (i % 5) + 1, // Relaciona las categorías con las primeras 5 sucursales
            nombre: `Categoría ${i + 1}`,
        }));
        await this.prismaService.categoria.createMany({ data: categorias });

        // 7. Producto
        const productos = Array.from({ length: 10 }, (_, i) => ({
            catId: (i % 5) + 1, // Relaciona los productos con las primeras 5 categorías
            prodNom: `Producto ${i + 1}`,
            prodDescrip: `Descripción del producto ${i + 1}`,
            prodPcompra: 10 + i * 5,
            prodPventa: 15 + i * 5,
            prodStock: 100 - i * 5,
            prodFechaven: new Date(2025, 11, i + 1), // Fecha de vencimiento simulada
            status: true,
        }));
        await this.prismaService.producto.createMany({ data: productos });

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
        const usuarios = Array.from({ length: 10 }, (_, i) => ({
            sucId: (i % 5) + 1, // Relaciona los usuarios con las primeras 5 sucursales
            rolId: (i % 3) + 1, // Relaciona los usuarios con los primeros 3 roles
            usuNombre: `Usuario ${i + 1}`,
            usuApellido: `Apellido ${i + 1}`,
            usuCorreo: `usuario${i + 1}@correo.com`,
            usuPassword: `password${i + 1}`,
            status: true,
        }));
        await this.prismaService.usuario.createMany({ data: usuarios });

        // 10. Cliente
        const clientes = Array.from({ length: 10 }, (_, i) => ({
            empId: (i % 5) + 1, // Relaciona los clientes con las primeras 5 empresas
            cliNombre: `Cliente ${i + 1}`,
            cliRif: `${12345678 + i}`,
            cliTelefono: `0412${2345678 + i}`,
            cliDireccion: `Calle ${i + 1}`,
            cliCorreo: `cliente${i + 1}@correo.com`,
            status: true,
        }));
        await this.prismaService.cliente.createMany({ data: clientes });

        baseResponse.message = 'Datos base cargados correctamente.';
        return baseResponse;
    }
}
