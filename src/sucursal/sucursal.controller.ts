import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { DtoSucursal, DtoUpdateSucursal } from 'src/dto/sucursal.dto';

@Controller('sucursal')
export class SucursalController {

    constructor(private sucursalesService: SucursalService) {
        
    }

    @Get()
    async getSucursales() {
        return await this.sucursalesService.getSucursales()
    }
    @Post()
    async createSucursal(@Body() sucursal: DtoSucursal): Promise<DtoBaseResponse> {
        return await this.sucursalesService.createSucursal(sucursal);
    }
    @Put()
    async updateSucursal(@Body() sucursal: DtoUpdateSucursal): Promise<DtoBaseResponse> {
        return await this.sucursalesService.updateSucursal(sucursal);
    }
    @Delete('/:id')
    async deleteSucursal(@Param('id') id: string): Promise<DtoBaseResponse> {
        return await this.sucursalesService.deleteSucursal(Number(id));
    }
}
