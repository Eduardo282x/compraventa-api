import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto, UpdateProductoDto } from 'src/dto/producto.dto';
import { DtoBaseResponse } from 'src/dto/base.dto';

@Controller('producto')
export class ProductoController {

    constructor(private productoServices: ProductoService) {

    }

    @Get()
    async getProducts() {
        return await this.productoServices.getProducts();
    }

    @Get('/moneda')
    async getMonedas() {
        return await this.productoServices.getMonedas();
    }

    @Get('/unidades')
    async getUnidades() {
        return await this.productoServices.getUnidades();
    }

    @Post()
    async createProducto(@Body() producto: CreateProductoDto): Promise<DtoBaseResponse> {
        return await this.productoServices.createProducto(producto);
    }
    @Put()
    async updateProducto(@Body() producto: UpdateProductoDto): Promise<DtoBaseResponse> {
        return await this.productoServices.updateProducto(producto);
    }
    @Delete('/:id')
    async deleteProducto(@Param('id') id: string): Promise<DtoBaseResponse> {
        return await this.productoServices.deleteProducto(Number(id));
    }
}
