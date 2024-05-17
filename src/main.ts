import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { TypeOrmExceptionFilter } from './response/typeorm-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  app.setGlobalPrefix('/api/v1/');
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  await app.listen(5000);
}
bootstrap();
