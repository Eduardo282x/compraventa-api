import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto, DtoIncreaseProductStore, DtoSaveProduct, UpdateProductoDto } from 'src/dto/producto.dto';
import { DtoBaseResponse } from 'src/dto/base.dto';

@Controller('producto')
export class ProductoController {

    constructor(private productoServices: ProductoService) {

    }

    @Get('/almacen')
    async getStore() {
        return await this.productoServices.getStore();
    }
    
    @Get('/filter')
    async getFilteredProducts(@Query('categoria') category: string, @Query('producto') product: string, @Query('sucursalId') sucursalId: string) {
        return await this.productoServices.getFilteredProducts(category, product, Number(sucursalId));
    }

    @Get('/moneda')
    async getMonedas() {
        return await this.productoServices.getMonedas();
    }

    @Get('/unidades')
    async getUnidades() {
        return await this.productoServices.getUnidades();
    }

    @Get()
    async getProductsBySucursal(@Query('sucursalId') sucursalId: string) {
        return await this.productoServices.getProductsBySucursal(Number(sucursalId));
    }

    @Post()
    async createProducto(@Body() producto: CreateProductoDto): Promise<DtoBaseResponse> {
        return await this.productoServices.createProducto(producto);
    }
    @Put()
    async updateProducto(@Body() producto: UpdateProductoDto): Promise<DtoBaseResponse> {
        return await this.productoServices.updateProducto(producto);
    }
    @Put('/guardar')
    async saveProductInSucursal(@Body() producto: DtoSaveProduct): Promise<DtoBaseResponse> {
        return await this.productoServices.saveProductInSucursal(producto);
    }
    @Put('/aumentar')
    async increaseAmountStore(@Body() producto: DtoIncreaseProductStore): Promise<DtoBaseResponse> {
        return await this.productoServices.increaseAmountStore(producto);
    }
    @Delete('/:id')
    async deleteProducto(@Param('id') id: string): Promise<DtoBaseResponse> {
        return await this.productoServices.deleteProducto(Number(id));
    }
}
