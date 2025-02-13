import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { DtoCarrito, DtoUpdateAmountCarrito } from 'src/dto/carrito.dto';

@Controller('carrito')
export class CarritoController {

    constructor(private carritoService: CarritoService) {

    }

    @Get('/:id')
    async getCarritoByClient(@Param('id') cliId: string) {
        return await this.carritoService.getCarritoByClient(Number(cliId));
    }
    @Post()
    async addToCarrito(@Body() carrito: DtoCarrito) {
        return await this.carritoService.addToCarrito(carrito);
    }
    @Put()
    async updateCarrito(@Body() carrito: DtoUpdateAmountCarrito) {
        return await this.carritoService.updateCarrito(carrito);
    }
    @Delete('/:id')
    async deleteProductCarrito(@Param('id') id: string) {
        return await this.carritoService.deleteProductCarrito(Number(id));
    }

}
