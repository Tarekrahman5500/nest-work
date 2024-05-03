import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SharedModule } from '../shared/shared.module';
import { connection } from '../common/constants/connection';

@Module({
  imports: [SharedModule],
  controllers: [SongsController],
  providers: [SongsService, { provide: 'CONNECTION', useValue: connection }],
})
export class SongsModule {}
