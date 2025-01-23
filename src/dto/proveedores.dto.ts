import { IsNotEmpty, IsString, IsBoolean, IsEmail, IsNumber } from 'class-validator';

export class CreateProveedorDto {
    @IsNotEmpty()
    @IsString()
    provNom: string;

    @IsNotEmpty()
    @IsString()
    provRuc: string;

    @IsNotEmpty()
    @IsString()
    provTelf: string;

    @IsNotEmpty()
    @IsString()
    provDirecc: string;

    @IsNotEmpty()
    @IsEmail()
    provCorreo: string;

    @IsBoolean()
    status: boolean;
}


export class UpdateProveedorDto extends CreateProveedorDto {
    @IsNumber()
    provId: number;
}
