// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { ResponseService } from '../common/global-exception.filter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'codistesecretedonottouch', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ResponseService],
  exports: [UserService],
})
export class UserModule {}
