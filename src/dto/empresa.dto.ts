import { IsEmail, IsNumber, IsString } from "class-validator";

export class DtoEmpresa {
    @IsString()
    companyName: string;
    @IsString()
    companyRuc: string;
    @IsString()
    companyPhone: string;
    @IsEmail()
    companyEmail: string;
    @IsString()
    companyAddress: string;
}

export class DtoUpdateEmpresa extends DtoEmpresa {
    @IsNumber()
    id: number;
}