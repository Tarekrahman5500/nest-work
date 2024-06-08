import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { TypeOrmExceptionFilter } from './response/typeorm-exception.filter';
import { ResponseInterceptor } from './common/interceptors/responseInterceptor';
import { AllExceptionsFilter } from './common/interceptors/allExceptionsFilter';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.use(morgan('combined'));
  app.setGlobalPrefix('/api/v1/');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(configService.get('validateEnv').PORT);
}

bootstrap();
