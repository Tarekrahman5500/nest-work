import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PlayList } from '../playlist/playList.entity';
import { Song } from '../songs/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayList, Song, User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
