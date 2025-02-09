import { Injectable } from '@nestjs/common';
import { DtoLogin, DtoLoginClient, ResponseLogin } from 'src/dto/auth.dto';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DtoClientes } from 'src/dto/clients.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {

    }

    async authClient(client: DtoLoginClient): Promise<DtoBaseResponse | ResponseLogin> {
        const findClient = await this.prismaService.cliente.findFirst({
            where: {
                cliCorreo: client.email,
                cliPassword: client.password
            }
        })

        if (!findClient) {
            badResponse.message += 'Correo o contraseña incorrectos.'
            return badResponse;
        }

        baseResponse.message = `Bienvenido ${findClient.cliNombre} ${findClient.cliApellido}`

        const response: ResponseLogin = {
            ...baseResponse,
            userData: findClient
        }

        return response;
    }

    async authRegisterClient(cliente: DtoClientes): Promise<DtoBaseResponse | ResponseLogin> {
        const findClient = await this.prismaService.cliente.create({
            data: {
                cliNombre: cliente.cliNombre,
                cliApellido: cliente.cliApellido,
                cliRif: cliente.cliRif,
                cliTelefono: cliente.cliTelefono,
                cliDireccion: cliente.cliDireccion,
                cliCorreo: cliente.cliCorreo,
                cliPassword: cliente.cliPassword,
            }
        })

        baseResponse.message = `Cliente registrado.`

        const response: ResponseLogin = {
            ...baseResponse,
            userData: findClient
        }

        return response;
    }

    async auth(user: DtoLogin): Promise<DtoBaseResponse | ResponseLogin> {

        if (user.sucursalId !== '0' && user.empresaId !== '0') {
            const findUser = await this.prismaService.usuario.findFirst({
                where: {
                    usuCorreo: user.email,
                    usuPassword: user.password
                },
                include: {
                    Rol: true
                }
            })

            if (!findUser) {
                badResponse.message += 'Correo o contraseña incorrectos.'
                return badResponse;
            }

            if (findUser.sucId !== Number(user.sucursalId)) {
                badResponse.message = 'Este usuario no esta registrado en esta sucursal'
                return badResponse;
            }

            baseResponse.message = `Bienvenido ${findUser.usuNombre} ${findUser.usuApellido}`

            const response: ResponseLogin = {
                ...baseResponse,
                userData: findUser
            }

            return response;
        }

        const findUser = await this.prismaService.usuario.findFirst({
            where: {
                usuCorreo: user.email,
                usuPassword: user.password
            },
            include: {
                Rol: true
            }
        })

        if (!findUser) {
            badResponse.message += 'Correo o contraseña incorrectos.'
            return badResponse;
        }

        baseResponse.message = `Bienvenido ${findUser.usuNombre} ${findUser.usuApellido}`

        const response: ResponseLogin = {
            ...baseResponse,
            userData: findUser
        }

        return response;
    }
}
