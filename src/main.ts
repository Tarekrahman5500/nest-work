import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { TypeOrmExceptionFilter } from './response/typeorm-exception.filter';
import { ResponseInterceptor } from './common/interceptors/responseInterceptor';
import { AllExceptionsFilter } from './common/interceptors/allExceptionsFilter';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.use(morgan('combined'));
  app.setGlobalPrefix('/api/v1/');
  // Apply global interceptors
  const config = new DocumentBuilder()
    .setTitle('Spotify Clone')
    .setDescription('The Spotify Clone API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      // Enable Bearer Auth here
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    ) // We will use this Bearer Auth with the JWT-auth name on the controller function
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/doc', app, document);

  // Start the application
  await app.listen(configService.get('validateEnv').PORT);
}

bootstrap();
