import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DtoSucursal, DtoUpdateSucursal } from 'src/dto/sucursal.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SucursalService {
    constructor(private prismaService: PrismaService) {

    }

    async getSucursales() {
        return await this.prismaService.sucursal.findMany({
            include: {
                Empresa: true
            }
        });
    }

    async createSucursal(sucursal: DtoSucursal): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sucursal.create({
                data: {
                    sucNom: sucursal.sucNom,
                    status: sucursal.status,
                    empId: sucursal.empId
                }
            })

            baseResponse.message = 'Sucursal creada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async updateSucursal(sucursal: DtoUpdateSucursal): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sucursal.update({
                data: {
                    sucNom: sucursal.sucNom,
                    status: sucursal.status,
                    empId: sucursal.empId,
                },
                where: {
                    sucId: sucursal.sucId
                }
            })

            baseResponse.message = 'Sucursal actualizada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async deleteSucursal(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.sucursal.delete({
            where: {
                sucId: id
            }
        })
        baseResponse.message = 'Sucursal eliminada.';
        return baseResponse;
    }
}
