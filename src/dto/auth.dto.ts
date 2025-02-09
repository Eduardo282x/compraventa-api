import { IsOptional, IsString } from "class-validator";
import { DtoBaseResponse } from "./base.dto";

export class DtoLogin {
    @IsString()
    email: string;
    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    empresaId: string;
    @IsString()
    @IsOptional()
    sucursalId: string;
}

export class ResponseLogin extends DtoBaseResponse {
    userData: any;
}

export class DtoLoginClient {
    @IsString()
    email: string;
    @IsString()
    password: string;
}