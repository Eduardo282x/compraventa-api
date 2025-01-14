import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesService {
    constructor(private prismaService: PrismaService) {
        
    }

    async getClientes() {
        return await this.prismaService.cliente.findMany();
    }
}
