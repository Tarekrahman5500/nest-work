import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongSchema } from './dto/crate-song-dto';
import { ValidationService } from '../error-handler/validationService';
import { FormatResponseInterceptor } from '../common/interceptors/format-response.interceptor';
import { ApiResponse } from '../response/ApiResponse';
import { ValidationMiddleware } from '../common/validation/middleware';
import { z } from 'nestjs-zod/z';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songService: SongsService,
    private readonly validationService: ValidationService,
  ) {}

  @Get()
  findAll() {
    console.log('here');
    const data = { message: 'Hello, world!' };

    // Return data wrapped in ApiResponse
    console.log(data);
    return {
      statusCode: 200,
      success: true,
      timestamp: new Date().toISOString(),
      path: '/example',
      message: 'Data fetched successfully',
      data: [data],
      errors: [],
    };
    //return this.songService.findAll();
  }

  @Post('create')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @Use(new ValidationMiddleware(CreateSongSchema))
  create(@Req() req: Request) {
    const validatedData = this.validationService.validateWithSchema(
      CreateSongSchema,
      req,
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

  @Get('any')
  @UseInterceptors(new FormatResponseInterceptor())
  getData() {
    // Simulated data

    console.log('here');
    const data = { message: 'Hello, world!' };

    // Return data wrapped in ApiResponse
    console.log(data);
    return {
      statusCode: 200,
      success: true,
      timestamp: new Date().toISOString(),
      path: '/example',
      message: 'Data fetched successfully',
      data: [data],
      errors: [],
    };
  }
}
