import { Injectable, ForbiddenException } from '@nestjs/common';
import bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { ILogin } from './login.interfaces';

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
}
