import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DtoPaymentMethods, DtoUpdatePaymentMethod } from 'src/dto/pagos.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PagoService {
    constructor(private prismaService: PrismaService) {

    }

    async getPays(){
        return await this.prismaService.payments.findMany({
            include: {methodPayment: true}
        });
    }

    async getMethodsPayments() {
        return await this.prismaService.paymentMethods.findMany();
    }

    async createMethodsPayments(metodo: DtoPaymentMethods): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.paymentMethods.create({
                data: {
                    bank: metodo.bank,
                    identify: metodo.identify,
                    email: metodo.email,
                    phone: metodo.phone,
                    owner: metodo.owner,
                    type: metodo.type,
                    currencyId: metodo.currencyId,
                }
            })

            baseResponse.message = 'Método de pago creado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async updateMethodsPayments(metodo: DtoUpdatePaymentMethod): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.paymentMethods.update({
                data: {
                    bank: metodo.bank,
                    identify: metodo.identify,
                    email: metodo.email,
                    phone: metodo.phone,
                    owner: metodo.owner,
                    type: metodo.type,
                    currencyId: metodo.currencyId,
                },
                where: {
                    id: metodo.id
                }
            })

            baseResponse.message = 'Método de pago actualizado.'
            return baseResponse;
        } catch (err) {
            badResponse.message = err;
            return badResponse;
        }
    }
    async deleteMethodsPayments(id: number): Promise<DtoBaseResponse> {
        await this.prismaService.paymentMethods.delete({
            where: {
                id: id
            }
        })
        baseResponse.message = 'Método de pago eliminado.';
        return baseResponse;
    }
}
