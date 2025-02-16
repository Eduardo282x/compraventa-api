import { IsNumber, IsString } from "class-validator";

export class DtoPaymentMethods {
    @IsString()
    bank: string;
    @IsString()
    identify: string;
    @IsString()
    email: string;
    @IsString()
    phone: string;
    @IsString()
    owner: string;
    @IsString()
    type: string;
    @IsNumber()
    currencyId: number;
}

export class DtoUpdatePaymentMethod extends DtoPaymentMethods {
    @IsNumber()
    id: number;
}