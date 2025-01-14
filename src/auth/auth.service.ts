import { Injectable } from '@nestjs/common';
import { DtoLogin, ResponseLogin } from 'src/dto/auth.dto';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {
        
    }

    async getUsers() {
        return await this.prismaService.usuario.findMany();
    }

    async auth(user: DtoLogin): Promise<DtoBaseResponse | ResponseLogin>{
        const findUser = await this.prismaService.usuario.findFirst({
            where: {
                usuCorreo: user.username,
                usuPassword: user.password
            },
            include: {
                Rol: true
            }
        })

        if(!findUser){
            badResponse.message += 'Correo o contraseña incorrectos.'
            return badResponse;
        }

        baseResponse.message = `Bienvenido ${findUser.usuNombre} ${findUser.usuApellido}`

        const response: ResponseLogin = {
            ...baseResponse,
            userData: findUser
        }
        

        return response;
    }
}
