import { Injectable } from '@nestjs/common';
import { DtoBaseResponse, baseResponse, badResponse } from 'src/dto/base.dto';
import { CreateProveedorDto, UpdateProveedorDto } from 'src/dto/proveedores.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProveedoresService {
    constructor(private prismaService: PrismaService) {

    }

    async getProveedores() {
        return await this.prismaService.proveedor.findMany();
    }

    async createProveedores(proveedores: CreateProveedorDto): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.proveedor.create({
                data: {
                    name: proveedores.name,
                    ruc: proveedores.ruc,
                    phone: proveedores.phone,
                    address: proveedores.address,
                    email: proveedores.email,
                }
            })

            baseResponse.message = 'Proveedor creado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async updateProveedores(proveedores: UpdateProveedorDto): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.proveedor.update({
                data: {
                    name: proveedores.name,
                    ruc: proveedores.ruc,
                    phone: proveedores.phone,
                    address: proveedores.address,
                    email: proveedores.email,
                },
                where: {
                    id: proveedores.id
                }
            })

            baseResponse.message = 'Proveedor actualizada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async deleteProveedores(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.proveedor.delete({
            where: {
                id: id
            }
        })
        baseResponse.message = 'Proveedor eliminada.';
        return baseResponse;
    }
}
