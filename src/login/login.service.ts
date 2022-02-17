import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { ILogin } from './login.interfaces';
import { JWT_SECRET_KEY } from '../common/config';

export const authMethod = 'Bearer';

@Injectable()
export class LoginService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) {}

    async authorizeUser (loginData: ILogin) {
        const { login, password } = loginData;

        try {
            const { password: hash } = await this.userService.getFullDataByLogin(login);
            const isPasswordValid = bcryptjs.compareSync(password, hash);

            if (!isPasswordValid) {
                throw new ForbiddenException();
            }

            const token = this.jwtService.sign({ login, password }) as string;
            return { token };
        } catch (err) {
            throw new ForbiddenException();
        }
    }

    auth (header = ''): boolean {
        const [method = '', token = ''] = header.split(' ');

        if (method !== authMethod) {
          throw new UnauthorizedException();
        }
        
        try {
            return !!this.jwtService.verify(token, { secret: JWT_SECRET_KEY });
        } catch(err) {
          throw new UnauthorizedException();
        }
    };
}
