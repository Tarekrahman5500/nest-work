import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { ISong } from './dto/song.interface';
import { CreateSongDto, ICreateSongDto } from './dto/crate-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from '../common/constants/types/uuid';

@Injectable()
export class SongsService {
  // creation of local db
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}

  async create(song: ICreateSongDto): Promise<ISong> {
    try {
      // Create and save the song
      const newSong = this.songRepository.create(song);
      return await this.songRepository.save(newSong);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ISong[]> {
    try {
      return this.songRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: UUID): Promise<ISong[]> {
    try {
      return this.songRepository.findBy({ id });
    } catch (error) {
      throw error;
    }
  }
}
