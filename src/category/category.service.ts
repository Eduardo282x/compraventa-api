import { Injectable } from '@nestjs/common';
import { DtoBaseResponse, baseResponse, badResponse } from 'src/dto/base.dto';
import { DtoCategorias, DtoUpdarteCategorias } from 'src/dto/producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

    constructor(private prismaService: PrismaService) {}

    async getCategories() {
        return await this.prismaService.categoria.findMany({
            include: {
                sucursal: true
            }
        });
    }

    async createCategory(category: DtoCategorias): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.categoria.create({
                data: {
                    sucId: category.sucId,
                    nombre: category.nombre,
                }
            })

            baseResponse.message = 'Categoría creada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async updateCategory(category: DtoUpdarteCategorias): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.categoria.update({
                data: {
                    sucId: category.sucId,
                    nombre: category.nombre,
                },
                where: {
                    catId: category.catId
                }
            })

            baseResponse.message = 'Categoría actualizada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async deleteCategory(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.categoria.delete({
            where: {
                catId: id
            }
        })
        baseResponse.message = 'Categoría eliminada.';
        return baseResponse;
    }
}
