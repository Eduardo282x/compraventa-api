import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SucursalService {
    constructor(private prismaService: PrismaService) {
        
    }

    async getSucursales() {
        return await this.prismaService.sucursal.findMany({
            include: {
                Empresa: true
            }
        });
    }
}
