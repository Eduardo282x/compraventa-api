import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateProveedorDto {
    @IsString()
    name: string;
    @IsString()
    ruc: string;
    @IsString()
    phone: string;
    @IsString()
    address: string;
    @IsEmail()
    email: string;
}


export class UpdateProveedorDto extends CreateProveedorDto {
    @IsNumber()
    id: number;
}
