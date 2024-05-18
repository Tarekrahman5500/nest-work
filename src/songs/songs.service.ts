import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Song } from './song.entity';
import { ISong } from './dto/song.interface';
import { ICreateSongDto } from './dto/crate-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from '../common/constants/types/uuid';
import { IUpdateSongDto } from './dto/update-song-dto';
import { isCreateSongDto } from './dto/isCreateSongDto';
import { CustomHttpException } from '../error-handler/custom.http.exception';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
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
      return await this.songRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: UUID): Promise<ISong[]> {
    try {
      return await this.songRepository.findBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async removeOne(id: UUID): Promise<DeleteResult> {
    try {
      return await this.songRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id: UUID, updateSongDto: IUpdateSongDto): Promise<ISong[]> {
    try {
      // console.log('Updating');
      const existingSong = await this.findOne(id);
      if (existingSong.length) {
        //console.log('Updating', existingSong);
        // Update existing song
        await this.songRepository.update(id, updateSongDto);
        return await this.findOne(id);
      }

      if (!isCreateSongDto(updateSongDto)) {
        console.log('now');
        throw new CustomHttpException(
          `Id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      // Create a new song
      const newSong = this.songRepository.create(
        updateSongDto as ICreateSongDto,
      );
      console.log(newSong);
      return [await this.songRepository.save(newSong)];
    } catch (error) {
      throw error;
    }
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
