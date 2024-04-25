import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongSchema } from './dto/crate-song-dto';
import { ValidationService } from '../error-handler/validationService';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songService: SongsService,
    private readonly validationService: ValidationService,
  ) {}

  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Post('create')
  create(@Body() data: any) {
    const validatedData = this.validationService.validateWithSchema(
      CreateSongSchema,
      data,
    );

    return this.songService.create(validatedData);
  }

  @Get(':id')
  findOne() {
    return this.songService.findAll();
  }

  @Put(':id')
  update() {
    return 'update';
  }

  @Delete(':id')
  delete() {
    return 'delete';
  }
}
