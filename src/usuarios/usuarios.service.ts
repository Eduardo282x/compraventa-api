import { Injectable } from '@nestjs/common';
import { DtoBaseResponse, baseResponse, badResponse } from 'src/dto/base.dto';
import { DtoUpdateUsuario, DtoUsuario } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {
    constructor(private prismaService: PrismaService) {
        
    }

    async getUsers() {
        return await this.prismaService.usuario.findMany({
            include: {
                rol: true
            }
        });
    }

    async getRoles() {
        return await this.prismaService.rol.findMany();
    }

    async createUsuario(usuario: DtoUsuario): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.usuario.create({
                data: {
                    sucId: usuario.sucId,
                    rolId: usuario.rolId,
                    name: usuario.name,
                    lastName: usuario.lastName,
                    email: usuario.email,
                    identify: usuario.identify,
                    password: usuario.password,
                    status: usuario.status,
                }
            })

            baseResponse.message = 'Usuario creado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async updateUsuario(usuario: DtoUpdateUsuario): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.usuario.update({
                data: {
                    sucId: usuario.sucId,
                    rolId: usuario.rolId,
                    name: usuario.name,
                    lastName: usuario.lastName,
                    email: usuario.email,
                    identify: usuario.identify,
                    password: usuario.password,
                    status: usuario.status,
                },
                where: {
                    id: usuario.id
                }
            })

            baseResponse.message = 'Usuario actualizado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async deleteUsuarios(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.usuario.delete({
            where: {
                id: id
            }
        })
        baseResponse.message = 'Usuario eliminada.';
        return baseResponse;
    }
}
