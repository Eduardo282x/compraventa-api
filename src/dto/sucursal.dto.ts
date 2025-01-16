import { IsBoolean, IsNumber, IsString } from "class-validator";

export class DtoSucursal {
    @IsNumber()
    empId: number;
    @IsString()
    sucNom: string;
    @IsBoolean()
    status: boolean;
}

export class DtoUpdateSucursal extends DtoSucursal {
    @IsNumber()
    sucId: number;
}