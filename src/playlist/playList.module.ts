import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Song } from 'src/songs/song.entity';
import { PlayList } from './playList.entity';
import { User } from '../user/user.entity';
import { PlayListsController } from './playList.controller';
import { PlayListsService } from './playList.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayList, Song, User])],
  controllers: [PlayListsController],
  providers: [PlayListsService],
})
export class PlayListModule {}
