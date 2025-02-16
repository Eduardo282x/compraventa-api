import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { CreateProductoDto, DtoIncreaseProductStore, DtoSaveProduct, UpdateProductoDto } from 'src/dto/producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductoService {
    constructor(private prismaService: PrismaService) {

    }

    async getStore() {
        return await this.prismaService.store.findMany({
            include: {
                provider: true,
                category: true,
                Moneda: true,
                unidad: true
            },
        });
    }

    async getProductsBySucursal(sucursalId: number) {
        return await this.prismaService.producto.findMany({
            include: {
                store: { include: { category: true } },
                sucursal: true,
            },
            where: {
                sucursalId
            }
        });
    }

    async getMonedas() {
        return await this.prismaService.moneda.findMany();
    }

    async getUnidades() {
        return await this.prismaService.unidad.findMany();
    }

    async getFilteredProducts(category: string, product: string, sucursalId: number) {
        const findCategory = await this.prismaService.category.findFirst({
            where: {
                category
            }
        })

        if (findCategory) {
            return await this.prismaService.producto.findMany({
                include: {
                    store: { include: { category: true } },
                },
                where: {
                    store: { categoryId: findCategory.id },
                    sucursalId
                }
            });
        } else {
            return await this.prismaService.producto.findMany({
                include: {
                    store: { include: { category: true } },
                },
                where: {
                    store: {
                        name: {
                            contains: product,
                            mode: 'insensitive',
                        }
                    },
                    sucursalId
                }
            });
        }
    }

    async createProducto(product: CreateProductoDto): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.store.create({
                data: {
                    categoryId: product.categoryId,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    amount: product.amount,
                    expirationDate: product.expirationDate,
                    img: product.img,
                    providerId: product.providerId,
                    currencyId: product.currencyId,
                    unitId: product.unitId,
                    unit: product.unit.toString(),
                }
            })

            baseResponse.message = 'Producto creado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async saveProductInSucursal(product: DtoSaveProduct) {
        try {
            const findProductInStore = await this.prismaService.store.findFirst({
                where: { id: product.storeId }
            })

            if (!findProductInStore) {
                badResponse.message = 'Producto no encontrado en almacén.'
                return badResponse;
            }

            if (product.amount > findProductInStore.amount) {
                badResponse.message = 'La cantidad solicitada excede la cantidad del almacén.'
                return badResponse;
            }

            const findProduct = await this.prismaService.producto.findFirst({
                where: { storeId: product.storeId, sucursalId: product.sucursalId }
            })

            if (findProduct) {
                await this.prismaService.producto.update({
                    data: { amount: findProduct.amount + product.amount },
                    where: { id: findProduct.id }
                })
            } else {
                await this.prismaService.producto.create({
                    data: {
                        storeId: product.storeId, sucursalId: product.sucursalId, amount: product.amount
                    }
                })
            }

            await this.prismaService.store.update({
                data: { amount: findProductInStore.amount - product.amount },
                where: { id: product.storeId }
            })

            baseResponse.message = 'Producto guardado.';
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async increaseAmountStore(product: DtoIncreaseProductStore) {
        try {

            const findProductInStore = await this.prismaService.store.findFirst({
                where: { id: product.storeId }
            })

            if (!findProductInStore) {
                badResponse.message = 'Producto no encontrado en almacén.'
                return badResponse;
            }

            await this.prismaService.store.update({
                data: { amount: product.amount + findProductInStore.amount },
                where: { id: findProductInStore.id }
            })

            baseResponse.message = 'Cantidad en almacén aumentada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async updateProducto(product: UpdateProductoDto): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.store.update({
                data: {
                    categoryId: product.categoryId,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    amount: product.amount,
                    expirationDate: product.expirationDate,
                    img: product.img,
                    providerId: product.providerId,
                    currencyId: product.currencyId,
                    unitId: product.unitId,
                    unit: product.unit.toString(),
                },
                where: {
                    id: product.id
                }
            })

            baseResponse.message = 'Producto actualizada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }

    async deleteProducto(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.store.delete({
            where: {
                id: id
            }
        })
        baseResponse.message = 'Producto eliminada.';
        return baseResponse;
    }
}
