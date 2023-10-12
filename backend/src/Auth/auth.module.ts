// user.module.ts
import { Module } from '@nestjs/common';
import { LoginController } from './auth.controller';
import { LoginService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'codistesecretedonottouch',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class AuthModule {}
