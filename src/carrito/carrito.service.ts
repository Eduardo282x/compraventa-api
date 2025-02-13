import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DtoCarrito, DtoUpdateAmountCarrito } from 'src/dto/carrito.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarritoService {
    constructor(private prismaService: PrismaService) {

    }

    async getCarritoByClient(cliId: number) {
        return await this.prismaService.carrito.findMany({
            where: { cliId },
            include: { producto: { include: { Categoria: true } } }
        })
    }

    async addToCarrito(carrito: DtoCarrito) {
        try {
            await this.prismaService.carrito.create({
                data: {
                    cliId: carrito.cliId,
                    prodId: carrito.prodId,
                    cant: carrito.cant
                }
            })
            baseResponse.message = 'Producto agregado';
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async updateCarrito(carrito: DtoUpdateAmountCarrito): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.carrito.update({
                data: {
                    cant: carrito.cant
                },
                where: {
                    id: carrito.id
                }
            })

            baseResponse.message = ''
            return baseResponse
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async deleteProductCarrito(id: number) {
        try {
            await this.prismaService.carrito.delete({
                where: { id }
            })
            return baseResponse;
        } catch (err) {
            return badResponse;
        }
    }
}
