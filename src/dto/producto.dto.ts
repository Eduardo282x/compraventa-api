import { Transform } from "class-transformer";
import { IsNumber, IsString, IsDate, IsOptional, } from "class-validator";

export class DtoCategory {
    @IsString()
    category: string;
}

export class DtoUpdateCategories extends DtoCategory {
    @IsNumber()
    id: number;
}

// ------------------------------------------------------

export class CreateProductoDto {
    @IsString()
    categoryId: string;
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsString()
    price: string;
    @IsString()
    amount: string;
    @IsString()
    @IsOptional()
    img: string;
    @IsString()
    providerId: string;
    @IsString()
    currencyId: string;
    @IsString()
    unitId: string;
    @IsString()
    unit: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    expirationDate: Date;
}

export class UpdateProductoDto extends CreateProductoDto {
    @IsString()
    id: string;
}


export class DtoSaveProduct {
    @IsNumber()
    storeId: number;
    @IsNumber()
    sucursalId: number;
    @IsNumber()
    amount: number;
}

export class DtoIncreaseProductStore {
    @IsNumber()
    storeId: number;
    @IsNumber()
    amount: number;
}