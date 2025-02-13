import { Injectable } from '@nestjs/common';
import { DtoBaseResponse, baseResponse, badResponse } from 'src/dto/base.dto';
import { DtoEmpresa, DtoUpdateEmpresa } from 'src/dto/empresa.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpresaService {
    constructor(private prismaService: PrismaService) {
    }

    async getEmpresas() {
        return await this.prismaService.empresa.findMany();
    }
    async createEmpresa(empresa: DtoEmpresa): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.empresa.create({
                data: {
                    empNom: empresa.empNom,
                    empRuc: empresa.empRuc,
                    empCorreo: empresa.empCorreo,
                    empTelf: empresa.empTelf,
                    empDirecc: empresa.empDirecc,
                    status: empresa.status
                }
            })

            baseResponse.message = 'Empresa creada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async updateEmpresa(empresa: DtoUpdateEmpresa): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.empresa.update({
                data: {
                    empNom: empresa.empNom,
                    empRuc: empresa.empRuc,
                    empCorreo: empresa.empCorreo,
                    empTelf: empresa.empTelf,
                    empDirecc: empresa.empDirecc,
                    status: empresa.status
                },
                where: {
                    empId: empresa.id
                }
            })

            baseResponse.message = 'Empresa actualizada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async deleteEmpresa(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.empresa.delete({
            where: {
                empId: id
            }
        })
        baseResponse.message = 'Empresa eliminada.';
        return baseResponse;
    }
}
