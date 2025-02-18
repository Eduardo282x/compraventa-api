import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";


export class DtoPayment {
    @IsString()
    namePayer: string;
    @IsString()
    lastNamePayer: string;
    @IsString()
    identifyPayer: string;
    @IsString()
    phonePayer: string;
    @IsString()
    emailPayer: string;
    @IsString()
    bankPayer: string;
    @IsString()
    reference: string;
    @IsNumber()
    methodPaymentId: number;
}

export class DtoPedido {
    @IsNumber()
    clientId: number;
    @IsNumber()
    total: number;
    @ValidateNested()
    @Type(() => DtoPayment)
    payment: DtoPayment
}

export class DtoUpdatePedido {
    @IsNumber()
    id: number;
    @IsString()
    status: statusOrders;
}

type statusOrders = 'Creado' | 'Aprobado' | 'Denegado' | 'Eliminado';
