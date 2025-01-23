import { Transform } from "class-transformer";
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsDate, IsBoolean, IsDecimal } from "class-validator";

export class DtoCategorias {
    @IsNumber()
    sucId: number;
    @IsString()
    nombre: string;
}

export class DtoUpdarteCategorias extends DtoCategorias {
    @IsNumber()
    catId: number;
}

// ------------------------------------------------------

export class CreateProductoDto {
    @IsNotEmpty()
    @IsNumber()
    catId: number;

    @IsNotEmpty()
    @IsString()
    prodNom: string;

    @IsOptional()
    @IsString()
    prodDescrip?: string;

    @IsNotEmpty()
    @IsNumber()
    prodPcompra: number;

    @IsNotEmpty()
    @IsNumber()
    prodPventa: number;

    @IsOptional()
    @IsNumber()
    prodStock?: number;

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    prodFechaven: Date;

    @IsOptional()
    @IsString()
    prodImg?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @IsNumber()
    MonedaMonId?: number;

    @IsOptional()
    @IsNumber()
    UnidadUndId?: number;
}

export class UpdateProductoDto extends CreateProductoDto {
    @IsNotEmpty()
    @IsNumber()
    prodId: number;
}