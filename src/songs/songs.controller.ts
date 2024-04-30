import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto, CreateSongSchema } from './dto/crate-song-dto';
import { ValidationService } from '../error-handler/validationService';
import { FormatResponseInterceptor } from '../common/interceptors/format-response.interceptor';
import { ApiResponse } from '../response/ApiResponse';
import { ValidationMiddleware } from '../common/validation/middleware';
import { z } from 'nestjs-zod/z';
import { ZodValidationExceptionFilter } from '../error-handler/zodValidationExceptionFilter';
import { ZodValidationPipe } from 'nestjs-zod';

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
  // @Use(new ValidationMiddleware(CreateSongSchema))
  @UsePipes(new ZodValidationPipe(CreateSongDto))
  create(@Body() createSongDto: any) {
    /*const validatedData = this.validationService.validateWithSchema(
      CreateSongSchema,
      req,
    );
    console.log(validatedData);
    console.log(req.body);*/
    console.log(createSongDto);
    return this.songService.create(createSongDto);
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
