import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { DtoEmpresa, DtoUpdateEmpresa } from 'src/dto/empresa.dto';

@Controller('empresa')
export class EmpresaController {

    constructor(private empresaServices: EmpresaService) {
    }

    @Get()
    async getEmpresas() {
        return await this.empresaServices.getEmpresas();
    }
    @Post()
    async createEmpresa(empresa: DtoEmpresa): Promise<DtoBaseResponse> {
        return await this.empresaServices.createEmpresa(empresa);
    }
    @Put()
    async updateEmpresa(empresa: DtoUpdateEmpresa): Promise<DtoBaseResponse> {
        return await this.empresaServices.updateEmpresa(empresa);
    }
    @Delete()
    async deleteEmpresa(id: number): Promise<DtoBaseResponse> {
        return await this.empresaServices.deleteEmpresa(id);
    }
}
