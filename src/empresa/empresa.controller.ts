import { Controller, Get } from '@nestjs/common';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
export class EmpresaController {

    constructor(private empresaServices: EmpresaService) {
        
    }

    @Get()
    async getEmpresas() {
        return await this.empresaServices.getEmpresas();
    }
}
