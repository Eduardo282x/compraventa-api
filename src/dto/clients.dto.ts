import { IsBoolean, IsNumber, IsString } from "class-validator";

export class DtoClientes {
    @IsNumber()
    empId: number;
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
    @IsBoolean()
    status: boolean;
}

export class DtoUpdateCliente extends DtoClientes { 
    @IsNumber()
    id: number;
}