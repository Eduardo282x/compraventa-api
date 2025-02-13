import { IsNumber } from "class-validator";

export class DtoCarrito {
    @IsNumber()
    cliId: number;
    @IsNumber()
    prodId: number;
    @IsNumber()
    cant: number;
}

export class DtoUpdateAmountCarrito {
    @IsNumber()
    id: number;
    @IsNumber()
    cant: number;
}