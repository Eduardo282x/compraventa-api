import { IsBoolean, IsNumber, IsString } from "class-validator";

export class DtoUsuario {
    @IsNumber()
    sucId: number;
    @IsNumber()
    rolId: number;
    @IsString()
    name: string;
    @IsString()
    lastName: string;
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsBoolean()
    status: boolean;
}

export class DtoUpdateUsuario extends DtoUsuario {
    @IsNumber()
    id: number;
}