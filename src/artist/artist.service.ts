import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { UUID } from '../common/constants/types/uuid';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async findArtist(id: UUID): Promise<Artist> {
    // console.log(id);
    return this.artistRepository.findOneBy({ user: { id } });
  }
}
