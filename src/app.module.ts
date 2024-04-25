import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { ZodValidationExceptionFilter } from './error-handler/zodValidationException';

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [
    AppService,
    ZodValidationExceptionFilter,
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
