import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto, DtoIncreaseProductStore, DtoSaveProduct, UpdateProductoDto } from 'src/dto/producto.dto';
import { badResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

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

    // @Post()
    // async createProducto(@Body() producto: CreateProductoDto): Promise<DtoBaseResponse> {
    //     return await this.productoServices.createProducto(producto);
    // }

    // @Post()
    // @UseInterceptors(FileInterceptor('file', {
    //     storage: diskStorage({
    //         destination: './uploads',
    //         filename: (req, file, cb) => {
    //             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //             cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    //         }
    //     })
    // }))
    // async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() producto: CreateProductoDto): Promise<DtoBaseResponse> {
    //     return await this.productoServices.createProducto(producto, file.filename);
    // }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                if (!file) {
                    return cb(new Error('No se recibió un archivo'), null);
                }
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            }
        })
    }))
    async uploadFile(
        @Body() producto: CreateProductoDto,
        @UploadedFile() file?: Express.Multer.File,  // 👈 Opcional para evitar errores
    ): Promise<DtoBaseResponse> {
        if (!file) {
            badResponse.message = 'No se encontro el archivo'
            return badResponse;
        }

        return await this.productoServices.createProducto(producto, file.filename);
    }

    @Put()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                if (!file) {
                    return cb(new Error('No se recibió un archivo'), null);
                }
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            }
        })
    }))
    async updateProducto(
        @Body() producto: UpdateProductoDto,
        @UploadedFile() file?: Express.Multer.File,  // 👈 Opcional para evitar errores
    ): Promise<DtoBaseResponse> {
        if (!file) {
            badResponse.message = 'No se encontro el archivo'
            return badResponse;
        }

        return await this.productoServices.updateProducto(producto, file.filename);
    }


    // @Put()
    // async updateProducto(@Body() producto: UpdateProductoDto): Promise<DtoBaseResponse> {
    //     return await this.productoServices.updateProducto(producto);
    // }
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