import { IsBoolean, IsNumber, IsString } from "class-validator";

export class DtoSucursal {
    @IsNumber()
    companyId: number;
    @IsString()
    nombre: string;
}

export class DtoUpdateSucursal extends DtoSucursal {
    @IsNumber()
    sucId: number;
}