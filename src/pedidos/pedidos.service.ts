import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DtoPedido, DtoUpdatePedido } from 'src/dto/pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PedidosService {

    constructor(private prismaService: PrismaService) {
    }

    async getPedidos() {
        return await this.prismaService.pedidos.findMany({
            include: {
                cliente: true,
                payment: true,
                DetPedidos: { include: { producto: { include: { store: { include: { category: true } } } } } }
            },
            orderBy: {id: 'desc'}
        });
    }

    async getPedidosByClient(clientId: number) {
        return await this.prismaService.pedidos.findMany({
            where: { clientId },
            include: { DetPedidos: { include: { producto: { include: { store: { include: { category: true } } } } } } },
            orderBy: {id: 'desc'}
        });
    }

    async createPedido(pedido: DtoPedido): Promise<DtoBaseResponse> {
        try {
            const createPayment = await this.prismaService.payments.create({
                data: {
                    namePayer: pedido.payment.namePayer,
                    lastNamePayer: pedido.payment.lastNamePayer,
                    identifyPayer: pedido.payment.identifyPayer,
                    phonePayer: pedido.payment.phonePayer,
                    emailPayer: pedido.payment.emailPayer,
                    bankPayer: pedido.payment.bankPayer,
                    reference: pedido.payment.reference,
                    methodPaymentId: pedido.payment.methodPaymentId,
                }
            })

            const createPedido = await this.prismaService.pedidos.create({
                data: {
                    clientId: pedido.clientId,
                    paymentId: createPayment.id,
                    total: pedido.total,
                    status: 'Creado'
                }
            });

            const getProductCarritoByClient = await this.prismaService.carrito.findMany({
                where: { clientId: pedido.clientId }
            })

            getProductCarritoByClient.map(async carrito => {
                const findProduct = await this.prismaService.producto.findFirst({
                    include: { store: true },
                    where: { id: carrito.productId }
                })

                await this.prismaService.detPedidos.create({
                    data: {
                        amount: carrito.amount,
                        total: Number(findProduct.store.price) * carrito.amount,
                        orderId: createPedido.id,
                        productId: carrito.productId
                    }
                })

                await this.prismaService.producto.update({
                    data: {amount: findProduct.amount - carrito.amount},
                    where: {id: findProduct.id}
                })
            })

            await this.prismaService.carrito.deleteMany({
                where: { clientId: pedido.clientId }
            })

            baseResponse.message = 'Pedido creado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err.message;
            return badResponse;
        }
    }

    async updatePedido(pedido: DtoUpdatePedido): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.pedidos.update({
                data: { status: pedido.status },
                where: { id: pedido.id }
            })

            baseResponse.message = 'Pedido actualizado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err
            return badResponse;
        }
    }
}
