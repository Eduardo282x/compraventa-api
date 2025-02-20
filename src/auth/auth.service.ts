import { Injectable } from '@nestjs/common';
import { DtoLogin, DtoLoginClient, DtoPassword, DtoReturnPassword, ResponseLogin } from 'src/dto/auth.dto';
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
                clientEmail: client.email,
                clientPassword: client.password
            }
        })

        if (!findClient) {
            badResponse.message = 'Correo o contraseña incorrectos.'
            return badResponse;
        }

        baseResponse.message = `Bienvenido ${findClient.clientName} ${findClient.clientLastName}`

        const response: ResponseLogin = {
            ...baseResponse,
            userData: findClient
        }

        return response;
    }

    async authRegisterClient(cliente: DtoClientes): Promise<DtoBaseResponse | ResponseLogin> {
        const findClient = await this.prismaService.cliente.create({
            data: {
                clientName: cliente.clientName,
                clientLastName: cliente.clientLastName,
                clientRif: cliente.clientRif,
                clientPhone: cliente.clientPhone,
                clientAddress: cliente.clientAddress,
                clientEmail: cliente.clientEmail,
                clientPassword: cliente.clientPassword,
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
        const { email, password } = user;

        const findUser = await this.prismaService.usuario.findFirst({
            where: {
                email,
                password
            },
            include: {
                rol: true
            }
        })

        if (!findUser) {
            badResponse.message = 'Correo o contraseña incorrectos.'
            return badResponse;
        }

        if (user.sucursalId !== '0' && user.empresaId !== '0') {
            if (findUser.sucId !== Number(user.sucursalId)) {
                badResponse.message = 'Este usuario no esta registrado en esta sucursal'
                return badResponse;
            }
        }

        if (!findUser.status) {
            badResponse.message = 'Este usuario esta inactivo.';
            return badResponse;
        }

        baseResponse.message = `Bienvenido ${findUser.name} ${findUser.lastName}`

        const response: ResponseLogin = {
            ...baseResponse,
            userData: findUser
        }

        return response;
    }

    async updatePassword(bodyPassword: DtoPassword) {
        try {
            await this.prismaService.usuario.update({
                data: { password: bodyPassword.password },
                where: { id: bodyPassword.id }
            })

            baseResponse.message = 'Contraseña actualizada exitosamente.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err.message;
            return badResponse;
        }
    }

    async updatePasswordClient(bodyPassword: DtoPassword) {
        try {
            await this.prismaService.cliente.update({
                data: { clientPassword: bodyPassword.password },
                where: { id: bodyPassword.id }
            })

            baseResponse.message = 'Contraseña actualizada exitosamente.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err.message;
            return badResponse;
        }
    }

    async returnPasswordClient(newPassword: DtoReturnPassword) {
        console.log(newPassword);
        
        try {
            const findClient = await this.prismaService.cliente.findFirst({
                where: {
                    clientEmail: newPassword.email,
                    clientRif: newPassword.identify
                }
            })

            if (!findClient) {
                badResponse.message = 'Cliente no encontrado.';
                return badResponse;
            }

            await this.prismaService.cliente.update({
                data: { clientPassword: newPassword.password },
                where: { id: findClient.id }
            })

            baseResponse.message = 'Contraseña actualizada exitosamente.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err.message;
            return badResponse;
        }
    }

    async returnPassword(newPassword: DtoReturnPassword) {
        try {
            const findUser = await this.prismaService.usuario.findFirst({
                where: {
                    email: newPassword.email,
                    identify: newPassword.identify
                }
            })

            if (!findUser) {
                badResponse.message = 'Usuario no encontrado.';
                return badResponse;
            }

            await this.prismaService.usuario.update({
                data: { password: newPassword.password },
                where: { id: findUser.id }
            })

            baseResponse.message = 'Contraseña actualizada exitosamente.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err.message;
            return badResponse;
        }
    }
}
