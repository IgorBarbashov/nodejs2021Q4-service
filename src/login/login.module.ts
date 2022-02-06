import { Global, Module, DynamicModule } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UsersModule } from '../users/user.module';
import { UsersService } from '../users/user.service';
import { TasksService } from '../tasks/task.service';
import { User } from '../users/user.model';
import { Task } from '../tasks/task.model';
import { JWT_SECRET_KEY } from '../common/config';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([User, Task]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: 60 * 60 * 24 }
    }) as DynamicModule,
    UsersModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, UsersService, TasksService],
  exports: [LoginService]
})
export class LoginModule {}
