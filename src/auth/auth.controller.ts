import { Body, Controller, Post } from '@nestjs/common';
import { DtoLogin, DtoLoginClient, ResponseLogin } from 'src/dto/auth.dto';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { AuthService } from './auth.service';
import { DtoClientes } from 'src/dto/clients.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
        
    }

    @Post()
    async authLogin(@Body() auth: DtoLogin): Promise<DtoBaseResponse | ResponseLogin>{
        return await this.authService.auth(auth);
    }

    @Post('/cliente')
    async authClient(@Body() client: DtoLoginClient): Promise<DtoBaseResponse | ResponseLogin>{
        return await this.authService.authClient(client);
    }

    @Post('/cliente/register')
    async authRegisterClient(@Body() client: DtoClientes): Promise<DtoBaseResponse | ResponseLogin>{
        return await this.authService.authRegisterClient(client);
    }
}
