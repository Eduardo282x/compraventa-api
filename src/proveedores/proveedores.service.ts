import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProveedoresService {
    constructor(private prismaService: PrismaService) {
        
    }

    async getUsers() {
        return await this.prismaService.proveedor.findMany();
    }
}
