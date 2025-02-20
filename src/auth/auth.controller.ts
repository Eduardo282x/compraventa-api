import { Body, Controller, Post, Put } from '@nestjs/common';
import { DtoLogin, DtoLoginClient, DtoPassword, DtoReturnPassword, ResponseLogin } from 'src/dto/auth.dto';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { AuthService } from './auth.service';
import { DtoClientes } from 'src/dto/clients.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post()
    async authLogin(@Body() auth: DtoLogin): Promise<DtoBaseResponse | ResponseLogin> {
        return await this.authService.auth(auth);
    }

    @Post('/cliente')
    async authClient(@Body() client: DtoLoginClient): Promise<DtoBaseResponse | ResponseLogin> {
        return await this.authService.authClient(client);
    }

    @Post('/cliente/register')
    async authRegisterClient(@Body() client: DtoClientes): Promise<DtoBaseResponse | ResponseLogin> {
        return await this.authService.authRegisterClient(client);
    }

    @Put('/password')
    async updatePassword(@Body() password: DtoPassword): Promise<DtoBaseResponse | ResponseLogin> {
        return await this.authService.updatePassword(password);
    }
    @Put('/cliente/password')
    async updatePasswordClient(@Body() password: DtoPassword): Promise<DtoBaseResponse | ResponseLogin> {
        return await this.authService.updatePasswordClient(password);
    }

    @Put('/cliente/backup')
    async returnPasswordClient(@Body() newPassword: DtoReturnPassword): Promise<DtoBaseResponse | ResponseLogin> {
        return await this.authService.returnPasswordClient(newPassword);
    }
    @Put('/backup')
    async returnPassword(@Body() newPassword: DtoReturnPassword): Promise<DtoBaseResponse | ResponseLogin> {
        return await this.authService.returnPassword(newPassword);
    }
}
