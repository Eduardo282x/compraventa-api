import { Controller, Get } from '@nestjs/common';
import { SucursalService } from './sucursal.service';

@Controller('sucursal')
export class SucursalController {

    constructor(private sucursalesService: SucursalService) {
        
    }

    @Get()
    async getSucursales() {
        return await this.sucursalesService.getSucursales()
    }
}
