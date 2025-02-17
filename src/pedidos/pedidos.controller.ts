import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { DtoPedido, DtoUpdatePedido } from 'src/dto/pedido.dto';

@Controller('pedidos')
export class PedidosController {

    constructor(private pedidosService: PedidosService) {
    }

    @Get()
    async getPedidos() {
        return await this.pedidosService.getPedidos();
    }
    @Get('/:cliendId')
    async getPedidosByClient(@Param('cliendId') cliendId: string) {
        return await this.pedidosService.getPedidosByClient(Number(cliendId));
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
