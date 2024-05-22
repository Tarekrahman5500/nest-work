import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import { PlayList } from './playList.entity';
import { Song } from '../songs/song.entity';
import { User } from '../user/user.entity';
import { ICreatePlayList } from './dto/create.playList.dto';
import { CustomHttpException } from '../error-handler/custom.http.exception';
import { IPlayList } from './playList.interface';

@Injectable()
export class PlayListsService {
  constructor(
    @InjectRepository(PlayList)
    private playListRepo: Repository<PlayList>,
    @InjectRepository(Song)
    private songsRepo: Repository<Song>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: ICreatePlayList): Promise<IPlayList> {
    // Fetch the songs by their UUIDs
    const songs = await this.songsRepo.findBy({
      id: In(playListDTO.songs),
    });

    // Validate if all songs were found
    if (songs.length !== playListDTO.songs.length) {
      throw new CustomHttpException(
        'Some songs in the playlist were not found',
        HttpStatus.NOT_FOUND,
      );
    }

    // Fetch the user by their UUID
    const user = await this.userRepo.findBy({ id: playListDTO.user });
    if (!user) {
      throw new CustomHttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Create a new PlayList entity
    const newPlayList = this.playListRepo.create({
      ...playListDTO,
      songs,
      user: user[0],
    });

    return await this.playListRepo.save(newPlayList);
  }
}
