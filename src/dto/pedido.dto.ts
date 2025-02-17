import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class DtoPedido {
    @IsNumber()
    clientId: number;
    @IsNumber()
    total: number;
    @Type(() => DtoPayment)
    payment: DtoPayment
}

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