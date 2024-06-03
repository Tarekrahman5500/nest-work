import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import {
  CreateSongDto,
  CreateSongSchema,
  ICreateSongDto,
  UUIDSchema,
} from './dto/crate-song-dto';
import { ValidationService } from '../error-handler/validationService';
import { FormatResponseInterceptor } from '../common/interceptors/format-response.interceptor';
import { ApiResponse } from '../response/ApiResponse';
import { ZodValidationPipe } from 'nestjs-zod';
import { CustomHttpException } from '../error-handler/custom.http.exception';
import { z } from 'nestjs-zod/z';
import { Connection } from '../common/constants/connection';
import { UUID } from '../common/constants/types/uuid';
import { raw } from 'express';
import {
  IUpdateSongDto,
  UpdateSongDto,
  UpdateSongSchema,
} from './dto/update-song-dto';
import { ArtistsJwtGuard } from '../auth/guard/artists.jwt.guard';
import { CustomRequest } from '../common/constants/custom.request';

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
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit = 1,
  ): Promise<ApiResponse<object>> {
    limit = limit > 100 ? 100 : limit;
    const songs = await this.songService.paginate({
      page,
      limit,
    });
    const response: ApiResponse<object> = {
      statusCode: HttpStatus.OK,
      success: false,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Successfully get songs',
      data: [songs],
      errors: [],
    };

    return response;
  }

  @Post('create')
  @UseGuards(ArtistsJwtGuard)
  @UsePipes(new ZodValidationPipe(CreateSongDto))
  async create(
    @Body() createSongDto: ICreateSongDto,
    @Request() request: CustomRequest,
  ) {
    console.log(request.user);
    /*const validatedData = this.validationService.validateWithSchema(
      CreateSongSchema,
      req,
    );
    console.log(validatedData);
    console.log(req.body);*/
    //console.log(req.body, req.url);
    //console.log(createSongDto);
    return await this.songService.create(createSongDto);
  }

  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id', new ZodValidationPipe(z.string())) id: UUID,
  ): Promise<ApiResponse<object>> {
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
  // @UsePipes(new ZodValidationPipe(UUIDSchema))
  async update(
    @Req() req: Request,
    @Param('id', new ZodValidationPipe(UUIDSchema)) id: UUID,
    //@Param('id') id: UUID,
    @Body(new ZodValidationPipe(UpdateSongDto)) updateSongDto: IUpdateSongDto,
  ): Promise<ApiResponse<object>> {
    //console.log('update', id);
    const updateSong = await this.songService.updateOne(id, updateSongDto);
    console.log(updateSong);
    const response: ApiResponse<object> = {
      statusCode: HttpStatus.CREATED,
      success: true,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Successfully updated song',
      data: updateSong,
      errors: [],
    };

    return response;
  }

  @Delete(':id')
  async delete(
    @Req() req: Request,
    @Param('id', new ZodValidationPipe(z.string())) id: UUID,
  ): Promise<ApiResponse<object>> {
    const result = await this.songService.removeOne(id);
    const response: ApiResponse<object> = {
      statusCode: HttpStatus.CREATED,
      success: true,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Successfully removed song with id: ' + id,
      data: [result],
      errors: [],
    };

    return response;
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
