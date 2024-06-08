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
import { SharedModule } from './shared/shared.module';
import { PlayListModule } from './playlist/playList.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import validateEngConfig from './config/validateEngConfig';
import { EnvConfigModule } from './config/env.config.module';

const devConfig = { port: 5000 };
const proConfig = { port: 8080 };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, validateEngConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeorm = configService.get('typeorm');
        const validateEnv = configService.get('validateEnv');
        console.log('TypeORM Configuration:', typeorm, validateEnv); // Log the configuration to debug
        return typeorm;
      },
    }),
    SharedModule,
    SongsModule,
    PlayListModule,
    ResponseModule,
    AuthModule,
    UserModule,
    ArtistModule,
    EnvConfigModule,
  ],
  controllers: [AppController, ArtistController],
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
