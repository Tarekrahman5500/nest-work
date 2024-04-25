import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // creation of local db

  private readonly songs = [];

  create(song: any) {
    this.songs.push(song);
    return this.songs;
  }
  findAll() {
    return this.songs;
  }
}
