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
    async getClienteById(id: number) {
        return await this.prismaService.cliente.findFirst({
            where: {id}
        });
    }
    async createCliente(cliente: DtoClientes): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.cliente.create({
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
                    clientName: cliente.clientName,
                    clientLastName: cliente.clientLastName,
                    clientRif: cliente.clientRif,
                    clientPhone: cliente.clientPhone,
                    clientAddress: cliente.clientAddress,
                    clientEmail: cliente.clientEmail,
                },
                where: {
                    id: cliente.id
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
                id: id
            }
        })
        baseResponse.message = 'Cliente eliminada.';
        return baseResponse;
    }
}
