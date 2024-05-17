import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { ZodValidationExceptionFilter } from './error-handler/zodValidationExceptionFilter';
import { ResponseModule } from './response/response.module';
import { ValidationMiddleware } from './common/validation/middleware';
import { DevConfigService } from './common/providers/devConfigService';
import * as process from 'node:process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SharedModule } from './shared/shared.module';
import { Song } from './songs/song.entity';

const devConfig = { port: 5000 };
const proConfig = { port: 8080 };

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'tarek17',
      username: 'postgres',
      entities: [Song],
      database: 'spotify-clone',
      synchronize: true,
      url: 'postgres://postgres:tarek17@localhost:5432/spotify-clone?timezone=Asia/Dhaka',
    }),
    SharedModule,
    SongsModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ZodValidationExceptionFilter,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: DevConfigService, useClass: DevConfigService },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'production' ? proConfig : devConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  /* constructor(dataSource: DataSource) {
    //k console.log(dataSource.driver.database);
  }*/
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware).forRoutes('*');
  }
}
