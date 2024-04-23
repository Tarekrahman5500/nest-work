import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  await app.listen(5000);
}
bootstrap();