import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, PrismaService]
})
export class ClientesModule {}
