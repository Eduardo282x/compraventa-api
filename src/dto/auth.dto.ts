import { IsString } from "class-validator";
import { DtoBaseResponse } from "./base.dto";

export class DtoLogin {
    @IsString()
    email: string;
    @IsString()
    password: string;
}

export class ResponseLogin extends DtoBaseResponse {
    userData: any;
}