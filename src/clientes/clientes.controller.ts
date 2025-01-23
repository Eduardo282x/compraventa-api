import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { DtoClientes, DtoUpdateCliente } from 'src/dto/clients.dto';

@Controller('clientes')
export class ClientesController {

    constructor(private clienteService: ClientesService) {
    }

    @Get()
    async getClientes() {
        return await this.clienteService.getClientes()
    }
    @Post()
    async createCliente(@Body() cliente: DtoClientes): Promise<DtoBaseResponse> {
        return await this.clienteService.createCliente(cliente);
    }
    @Put()
    async updateCliente(@Body() cliente: DtoUpdateCliente): Promise<DtoBaseResponse> {
        return await this.clienteService.updateCliente(cliente);
    }
    @Delete(':/id')
    async deleteCliente(@Param('id') id: string): Promise<DtoBaseResponse> {
        return await this.clienteService.deleteCliente(Number(id));
    }
}
