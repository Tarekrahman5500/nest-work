import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongSchema, ICreateSongDto } from './dto/crate-song-dto';
import { ValidationService } from '../error-handler/validationService';
import { FormatResponseInterceptor } from '../common/interceptors/format-response.interceptor';
import { ApiResponse } from '../response/ApiResponse';
import { ZodValidationPipe } from 'nestjs-zod';
import { CustomHttpException } from '../error-handler/custom.http.exception';
import { z } from 'nestjs-zod/z';
import { Connection } from '../common/constants/connection';
import { UUID } from '../common/constants/types/uuid';
import { raw } from 'express';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songService: SongsService,
    private readonly validationService: ValidationService,

    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(`connection = ${this.connection.CONNECTION_STRING}`);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<ApiResponse<object>> {
    const songs = await this.songService.findAll();
    const response: ApiResponse<object> = {
      statusCode: HttpStatus.OK,
      success: false,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Successfully get songs',
      data: songs,
      errors: [],
    };

    return response;
  }

  @Post('create')
  // @Use(new ValidationMiddleware(CreateSongSchema))
  @UsePipes(new ZodValidationPipe(CreateSongSchema))
  async create(
    @Body() createSongDto: ICreateSongDto,
    @Req() req: Request,
  ): Promise<ApiResponse<object>> {
    /*const validatedData = this.validationService.validateWithSchema(
      CreateSongSchema,
      req,
    );
    console.log(validatedData);
    console.log(req.body);*/
    //console.log(req.body, req.url);
    //console.log(createSongDto);
    const newSong = await this.songService.create(createSongDto);

    const response: ApiResponse<object> = {
      statusCode: HttpStatus.CREATED,
      success: true,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Successfully created a new song',
      data: [newSong],
      errors: [],
    };

    return response;
  }

  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id', new ZodValidationPipe(z.string())) id: UUID,
  ) {
    //return this.songService.findAll();

    const singleSong = await this.songService.findOne(id);

    const response: ApiResponse<object> = {
      statusCode: HttpStatus.CREATED,
      success: true,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Successfully get a song',
      data: singleSong,
      errors: [],
    };

    return response;
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
