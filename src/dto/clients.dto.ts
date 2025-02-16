import { IsNumber, IsString } from "class-validator";

export class DtoClientes {
    @IsString()
    clientName: string;
    @IsString()
    clientLastName: string;
    @IsString()
    clientRif: string;
    @IsString()
    clientPhone: string;
    @IsString()
    clientAddress: string;
    @IsString()
    clientEmail: string;
    @IsString()
    clientPassword: string;
}

export class DtoUpdateCliente extends DtoClientes {
    @IsNumber()
    id: number;
}