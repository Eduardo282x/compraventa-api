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
    @IsNumber()
    categoryId: number;
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsNumber()
    price: number;
    @IsNumber()
    amount: number;
    @IsString()
    @IsOptional()
    img: string;
    @IsNumber()
    providerId: number;
    @IsNumber()
    currencyId: number;
    @IsNumber()
    unitId: number;
    @IsNumber()
    unit: number;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    expirationDate: Date;
}

export class UpdateProductoDto extends CreateProductoDto {
    @IsNumber()
    id: number;
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