import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SharedModule } from '../shared/shared.module';
import { connection } from '../common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongsService, { provide: 'CONNECTION', useValue: connection }],
})
export class SongsModule {}
