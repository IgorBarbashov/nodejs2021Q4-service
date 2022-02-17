import {
  CanActivate, ExecutionContext, HttpException,
  HttpStatus, Injectable
} from '@nestjs/common';
import { LoginService } from './login.service';

export const pathsWithoutAuth = [
  '/',
  '/doc',
  '/login'
];

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService) {}

  canActivate(context: ExecutionContext ) {
    /* eslint-disable-next-line */
    const request = context.switchToHttp().getRequest();
    const path = `/${request.route.path.split('/')[1]}`
    const isPathWithoutAuth = pathsWithoutAuth.includes(path);

    if (isPathWithoutAuth) {
      return true;
    }

    const isTokenValid = this.loginService.auth(request.headers.authorization);
    if (isTokenValid) {
      return true;
    } 
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
