import { IsBoolean, IsNumber, IsString } from "class-validator";

export class DtoEmpresa {
    @IsString()
    empNom: string;
    @IsString()
    empRuc: string;
    @IsString()
    empCorreo: string;
    @IsString()
    empTelf: string;
    @IsString()
    empDirecc: string;
    @IsBoolean()
    status: boolean;
}

export class DtoUpdateEmpresa extends DtoEmpresa {
    @IsNumber()
    id: number;
}