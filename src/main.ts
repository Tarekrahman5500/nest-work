import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { TypeOrmExceptionFilter } from './response/typeorm-exception.filter';
import { ResponseInterceptor } from './common/interceptors/responseInterceptor';
import { AllExceptionsFilter } from './common/interceptors/allExceptionsFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  app.setGlobalPrefix('/api/v1/');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(5000);
}
bootstrap();
