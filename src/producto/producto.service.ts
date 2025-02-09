import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { CreateProductoDto, UpdateProductoDto } from 'src/dto/producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductoService {
    constructor(private prismaService: PrismaService) {

    }

    async getProducts() {
        return await this.prismaService.producto.findMany({
            include: {
                Moneda: true,
                Sucursal: true,
                Unidad: true,
                Categoria: true
            },
        });
    }

    async getFilteredProducts(category: string, product: string) {
        const findCategory = await this.prismaService.categoria.findFirst({
            where: {
                nombre: category
            }
        })

        if(findCategory) {
            return await this.prismaService.producto.findMany({
                include: {
                    Moneda: true,
                    Sucursal: true,
                    Unidad: true,
                    Categoria: true
                },
                where: {
                    catId: findCategory.catId
                }
            });
        } else {
            return await this.prismaService.producto.findMany({
                include: {
                    Moneda: true,
                    Sucursal: true,
                    Unidad: true,
                    Categoria: true
                },
                where: {
                    prodNom: {
                        contains: product,
                        mode: 'insensitive',    
                    }
                }
            });
        }
        
    }

    async getMonedas() {
        return await this.prismaService.moneda.findMany();
    }

    async getUnidades() {
        return await this.prismaService.unidad.findMany();
    }

    async createProducto(produc: CreateProductoDto): Promise<DtoBaseResponse> {
        try {

            const findSucursalByCategory = await this.prismaService.categoria.findFirst({
                where: {
                    catId: produc.catId
                }
            })

            await this.prismaService.producto.create({
                data: {
                    catId: produc.catId,
                    prodNom: produc.prodNom,
                    prodDescrip: produc.prodDescrip,
                    prodPcompra: produc.prodPcompra,
                    prodPventa: produc.prodPventa,
                    prodStock: produc.prodStock,
                    prodFechaven: produc.prodFechaven,
                    prodImg: produc.prodImg,
                    status: produc.status,
                    MonedaMonId: produc.MonedaMonId,
                    SucursalSucId: findSucursalByCategory.sucId,
                    UnidadUndId: produc.UnidadUndId,
                }
            })

            baseResponse.message = 'Producto creada.'
            return baseResponse;
        } catch (err) {
            badResponse.message += err;
            return badResponse;
        }
    }

    async updateProducto(produc: UpdateProductoDto): Promise<DtoBaseResponse> {
        try {
            const findSucursalByCategory = await this.prismaService.categoria.findFirst({
                where: {
                    catId: produc.catId
                }
            })

            await this.prismaService.producto.update({
                data: {
                    catId: produc.catId,
                    prodNom: produc.prodNom,
                    prodDescrip: produc.prodDescrip,
                    prodPcompra: produc.prodPcompra,
                    prodPventa: produc.prodPventa,
                    prodStock: produc.prodStock,
                    prodFechaven: produc.prodFechaven,
                    prodImg: produc.prodImg,
                    status: produc.status,
                    MonedaMonId: produc.MonedaMonId,
                    SucursalSucId: findSucursalByCategory.sucId,
                    UnidadUndId: produc.UnidadUndId,
                },
                where: {
                    prodId: produc.prodId
                }
            })

            baseResponse.message = 'Producto actualizada.'
            return baseResponse;
        } catch (err) {
            badResponse.message += err;
            return badResponse;
        }
    }

    async deleteProducto(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.producto.delete({
            where: {
                prodId: id
            }
        })
        baseResponse.message = 'Producto eliminada.';
        return baseResponse;
    }
}
