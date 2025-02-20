import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { DtoPedido, DtoUpdatePedido } from 'src/dto/pedido.dto';
import { Response } from 'express';

@Controller('pedidos')
export class PedidosController {

    constructor(private pedidosService: PedidosService) {
    }

    @Get('/factura/:pedidoId')
    async generarFactura(@Param('pedidoId') pedidoId: number, @Res() res: Response) {
        return await this.pedidosService.generarFactura(Number(pedidoId), res);
    }

    @Get()
    async getPedidos() {
        return await this.pedidosService.getPedidos();
    }
    @Get('/:id')
    async getPedidosByClient(@Param('id') id: string) {
        return await this.pedidosService.getPedidosByClient(Number(id));
    }
    @Post()
    async createPedido(@Body() pedido: DtoPedido) {
        return await this.pedidosService.createPedido(pedido);
    }
    @Put()
    async updatePedido(@Body() pedido: DtoUpdatePedido) {
        return await this.pedidosService.updatePedido(pedido);
    }
}
