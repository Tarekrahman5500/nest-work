import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SharedModule } from '../shared/shared.module';
import { ValidationMiddleware } from '../common/validation/middleware';

@Module({
  imports: [SharedModule],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
