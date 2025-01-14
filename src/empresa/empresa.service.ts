import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpresaService {
    constructor(private prismaService: PrismaService) {
        
    }

    async getEmpresas() {
        return await this.prismaService.empresa.findMany();
    }
}
