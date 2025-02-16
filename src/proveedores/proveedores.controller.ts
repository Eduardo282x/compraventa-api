import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto, UpdateProveedorDto } from 'src/dto/proveedores.dto';

@Controller('proveedores')
export class ProveedoresController {

    constructor(private proveedoresServices: ProveedoresService) {
    }

    @Get()
    getProveedores() {
        return this.proveedoresServices.getProveedores();
    }

    @Post()
    createProveedores(@Body() createProveedorDto: CreateProveedorDto) {
        return this.proveedoresServices.createProveedores(createProveedorDto);
    }

    @Put()
    updateProveedores(@Body() updateProveedorDto: UpdateProveedorDto) {
        return this.proveedoresServices.updateProveedores(updateProveedorDto);
    }

    @Delete('/:id')
    deleteProveedores(@Param('id') id: string) {
        return this.proveedoresServices.deleteProveedores(+id);
    }
}
