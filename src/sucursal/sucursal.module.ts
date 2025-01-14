import { Module } from '@nestjs/common';
import { SucursalController } from './sucursal.controller';
import { SucursalService } from './sucursal.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SucursalController],
  providers: [SucursalService, PrismaService]
})
export class SucursalModule {}
