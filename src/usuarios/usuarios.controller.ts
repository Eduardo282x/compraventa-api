import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { DtoUsuario, DtoUpdateUsuario } from 'src/dto/user.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuarioService: UsuariosService) {
    }

    @Get()
    async getUsers() {
        return await this.usuarioService.getUsers();
    }
    @Get('/roles')
    async getRoles() {
        return await this.usuarioService.getRoles();
    }

    @Post()
    async createUsuario(@Body() usuario: DtoUsuario): Promise<DtoBaseResponse> {
        return await this.usuarioService.createUsuario(usuario);
    }
    @Put()
    async updateUsuario(@Body() usuario: DtoUpdateUsuario): Promise<DtoBaseResponse> {
        return await this.usuarioService.updateUsuario(usuario);
    }
    @Delete('/:id')
    async deleteUsuarios(@Param('id') id: string): Promise<DtoBaseResponse> {
        return await this.usuarioService.deleteUsuarios(Number(id));
    }
}
