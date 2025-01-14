import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { VentaModule } from './venta/venta.module';
import { PagoModule } from './pago/pago.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { EmpresaModule } from './empresa/empresa.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { PrismaService } from './prisma/prisma.service';
import { MainloadModule } from './mainload/mainload.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductoModule, VentaModule, PagoModule, SucursalModule, EmpresaModule, UsuariosModule, ClientesModule, ProveedoresModule, MainloadModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
