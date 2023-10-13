import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // specify the allowed origins (an array of origins or a boolean: true to allow all origins)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable credentials (e.g., cookies, authorization headers)
  });

  await app.listen(8080);
}
bootstrap();
