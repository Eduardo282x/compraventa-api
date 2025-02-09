import { IsBoolean, IsNumber, IsString } from "class-validator";

export class DtoClientes {
    @IsString()
    cliNombre: string;
    @IsString()
    cliRif: string;
    @IsString()
    cliTelefono: string;
    @IsString()
    cliDireccion: string;
    @IsString()
    cliCorreo: string;
    @IsString()
    cliApellido: string;
    @IsString()
    cliPassword: string;
}

export class DtoUpdateCliente extends DtoClientes { 
    @IsNumber()
    id: number;
}