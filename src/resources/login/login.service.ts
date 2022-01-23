import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import { UsersService } from '../users/user.service';
import { ILogin } from './login.interfaces';
import { EntityNotFoundError, ForbiddenError } from '../../errors/customErrors';
import { REPOSITORY_ERROR_MESSAGES } from '../../constants';

export class LoginService {
    static async authorizeUser (body: ILogin): Promise<string> {
        const { login, password } = body;
        try {
            const { id, password: hash } = await UsersService.getFullDataByLogin(login);
            const isPasswordValid = bcryptjs.compareSync(password, hash);
            if (!isPasswordValid) {
                throw new ForbiddenError(`${REPOSITORY_ERROR_MESSAGES.LOGIN.PASSWORD_INVALID}`);
            }
            return jwt.sign({ userId: id, login }, JWT_SECRET_KEY);
        } catch (err) {
            if (err instanceof EntityNotFoundError) {
                throw new ForbiddenError(err.message);
            }
            throw err;
        }
    }
};
