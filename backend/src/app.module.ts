import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import {
  GlobalExceptionFilter,
  ResponseService,
} from './common/global-exception.filter';
import { AuthModule } from './Auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://abhipatel:abhicodiste@cluster0.qmehhlu.mongodb.net/codiste',
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ResponseService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
