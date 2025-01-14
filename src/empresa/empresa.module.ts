import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmpresaController],
  providers: [EmpresaService, PrismaService]
})
export class EmpresaModule {}
