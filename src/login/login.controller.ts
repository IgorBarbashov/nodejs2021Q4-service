import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ILogin } from './login.interfaces';

@Controller('login')
export class LoginController {
    
    constructor(private readonly loginService: LoginService) {}

    @Post()
    async authorizeUser(@Body() loginData: ILogin) {
        return await this.loginService.authorizeUser(loginData);
    }
}
