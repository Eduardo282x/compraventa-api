import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PagoService } from './pago.service';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { DtoPaymentMethods, DtoUpdatePaymentMethod } from 'src/dto/pagos.dto';

@Controller('payment-method')
export class PagoController {

    constructor(private pagoService: PagoService) {
    }

    @Get()
    async getMethodsPayments() {
        return await this.pagoService.getMethodsPayments()
    }
    @Post()
    async createMethodsPayments(@Body() metodo: DtoPaymentMethods): Promise<DtoBaseResponse> {
        return await this.pagoService.createMethodsPayments(metodo);
    }
    @Put()
    async updateMethodsPayments(@Body() metodo: DtoUpdatePaymentMethod): Promise<DtoBaseResponse> {
        return await this.pagoService.updateMethodsPayments(metodo);
    }
    @Delete(':/id')
    async deleteMethodsPayments(@Param('id') id: string): Promise<DtoBaseResponse> {
        return await this.pagoService.deleteMethodsPayments(Number(id));
    }

}
