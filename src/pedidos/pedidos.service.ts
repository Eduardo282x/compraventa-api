import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DtoPedido, DtoUpdatePedido } from 'src/dto/pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

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
            orderBy: { id: 'desc' }
        });
    }

    async getPedidosByClient(clientId: number) {
        return await this.prismaService.pedidos.findMany({
            where: { clientId },
            include: { DetPedidos: { include: { producto: { include: { store: { include: { category: true } } } } } } },
            orderBy: { id: 'desc' }
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
            const findPedido = await this.prismaService.pedidos.update({
                data: { status: pedido.status },
                where: { id: pedido.id }
            })

            if (pedido.status === 'Aprobado') {
                const findDetPedido = await this.prismaService.detPedidos.findMany({
                    where: { orderId: findPedido.id }
                });

                if (findDetPedido) {
                    findDetPedido.map(async (pe) => {
                        const findProducto = await this.prismaService.producto.findFirst({
                            where: { id: pe.productId }
                        })

                        await this.prismaService.producto.update({
                            data: { amount: findProducto.amount - pe.amount },
                            where: { id: findProducto.id }
                        })
                    })
                }
            }

            baseResponse.message = 'Pedido actualizado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err
            return badResponse;
        }
    }

    async generarFactura(pedidoId: number, res: Response) {
        const pedido = await this.prismaService.pedidos.findUnique({
            where: { id: pedidoId },
            include: {
                cliente: true,
                DetPedidos: {
                    include: {
                        producto: {
                            include: {
                                store: { include: { category: true } }
                            }
                        }
                    }
                }
            }
        });

        const cliente = pedido.cliente;
        const detalles = pedido.DetPedidos;

        const filePath = `./facturas/factura_${pedido.id}.pdf`;
        const doc = new PDFDocument({ margin: 30 });
        res.setHeader('Content-Disposition', `attachment; filename=factura.pdf`);
        res.setHeader('Content-Type', 'application/pdf');

        doc.pipe(res);

        // 🏪 Encabezado de la factura
        doc.fontSize(20).text('Factura de Compra', { align: 'center' }).moveDown();
        doc.fontSize(12).text(`Factura N°: ${(pedido.id).toString().padStart(7, '0')}`);
        doc.text(`Fecha: ${new Date(pedido.createDate).toLocaleDateString()}`).moveDown();

        // 👤 Datos del cliente
        doc.fontSize(14).text('Datos del Cliente:', { underline: true }).moveDown();
        doc.fontSize(12).text(`Nombre: ${cliente.clientName} ${cliente.clientLastName}`);
        doc.text(`Email: ${cliente.clientEmail}`);
        doc.text(`Cédula: ${cliente.clientRif}`);
        doc.text(`Teléfono: ${cliente.clientPhone}`);
        doc.text(`Dirección: ${cliente.clientAddress}`);
        doc.moveDown();

        // 🛒 Detalles del pedido
        doc.fontSize(14).text('Detalle del Pedido:', { underline: true }).moveDown();
        
        detalles.forEach((detalle, index) => {
            doc.fontSize(12).text(
                `${index + 1}.${detalle.producto.store.name} (${detalle.producto.store.category.category})`
            );
            doc.text(`Cantidad: ${detalle.amount}`);
            doc.text(`Precio: $${detalle.total}`);
            doc.moveDown();
        });

        // 💵 Total del pedido
        doc.fontSize(14).text(`Total: $${pedido.total.toFixed(2)}`, { align: 'right' }).moveDown();

        doc.end();
    }
}
