import { Injectable } from '@nestjs/common';
import { DtoBaseResponse, baseResponse, badResponse } from 'src/dto/base.dto';
import { DtoClientes, DtoUpdateCliente } from 'src/dto/clients.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesService {
    constructor(private prismaService: PrismaService) {

    }

    async getClientes() {
        return await this.prismaService.cliente.findMany();
    }
    async createCliente(cliente: DtoClientes): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.cliente.create({
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

            baseResponse.message = 'Cliente creada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async updateCliente(cliente: DtoUpdateCliente): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.cliente.update({
                data: {
                    cliNombre: cliente.cliNombre,
                    cliRif: cliente.cliRif,
                    cliTelefono: cliente.cliTelefono,
                    cliDireccion: cliente.cliDireccion,
                    cliCorreo: cliente.cliCorreo,
                },
                where: {
                    cliId: cliente.id
                }
            })

            baseResponse.message = 'Cliente actualizada.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async deleteCliente(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.cliente.delete({
            where: {
                cliId: id
            }
        })
        baseResponse.message = 'Cliente eliminada.';
        return baseResponse;
    }
}
