import { IsNumber } from "class-validator";

export class DtoCarrito {
    @IsNumber()
    productId: number;
    @IsNumber()
    amount: number;
    @IsNumber()
    clientId: number;
}

export class DtoUpdateAmountCarrito {
    @IsNumber()
    id: number;
    @IsNumber()
    amount: number;
}