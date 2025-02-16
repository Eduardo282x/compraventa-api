import { Injectable } from '@nestjs/common';
import { DtoBaseResponse, baseResponse, badResponse } from 'src/dto/base.dto';
import { DtoCategory, DtoUpdateCategories } from 'src/dto/producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

    constructor(private prismaService: PrismaService) {}

    async getCategories() {
        return await this.prismaService.category.findMany({orderBy: {id:'asc'}});
    }

    async createCategory(category: DtoCategory): Promise<DtoBaseResponse> {
        try {
            const findCategory = await this.prismaService.category.findFirst({
                where: {category: category.category}
            });

            if(findCategory){
                badResponse.message = 'Esta categoria ya existe.';
            return badResponse;
            }

            await this.prismaService.category.create({
                data: {
                    category: category.category,
                }
            })

            baseResponse.message = 'Categoría creada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async updateCategory(category: DtoUpdateCategories): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.category.update({
                data: {
                    category: category.category,
                },
                where: {
                    id: category.id
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
        await this.prismaService.category.delete({
            where: {
                id: id
            }
        })
        baseResponse.message = 'Categoría eliminada.';
        return baseResponse;
    }
}
