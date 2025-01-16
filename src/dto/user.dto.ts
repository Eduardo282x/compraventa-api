import { IsBoolean, IsNumber, IsString } from "class-validator";

export class DtoUsuario {
    @IsNumber()
    sucId: number;
    @IsNumber()
    rolId: number;
    @IsString()
    usuNombre: string;
    @IsString()
    usuApellido: string;
    @IsString()
    usuCorreo: string;
    @IsString()
    usuPassword: string;
    @IsBoolean()
    status: boolean;
}

export class DtoUpdateUsuario extends DtoUsuario {
    @IsNumber()
    id: number;
}