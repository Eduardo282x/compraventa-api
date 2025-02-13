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
                    empId: 1,
                    provNom: proveedores.provNom,
                    provRuc: proveedores.provRuc,
                    provTelf: proveedores.provTelf,
                    provDirecc: proveedores.provDirecc,
                    provCorreo: proveedores.provCorreo,
                    status: proveedores.status,
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
                    empId: 1,
                    provNom: proveedores.provNom,
                    provRuc: proveedores.provRuc,
                    provTelf: proveedores.provTelf,
                    provDirecc: proveedores.provDirecc,
                    provCorreo: proveedores.provCorreo,
                    status: proveedores.status,
                },
                where: {
                    provId: proveedores.provId
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
                provId: id
            }
        })
        baseResponse.message = 'Proveedor eliminada.';
        return baseResponse;
    }
}
