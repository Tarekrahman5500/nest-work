import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { ZodValidationPipe } from 'nestjs-zod';
import { CustomHttpException } from '../error-handler/custom.http.exception';
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
    //return this.songService.findAll();
    const response: ApiResponse<any> = {
      statusCode: HttpStatus.CONFLICT,
      success: false,
      timestamp: new Date().toISOString(),
      path: '/example',
      message: 'An error occurred',
      data: [],
      errors: [],
    };

    throw new CustomHttpException('no', HttpStatus.CONFLICT);
  }

  @Post('create')
  // @Use(new ValidationMiddleware(CreateSongSchema))
  @UsePipes(new ZodValidationPipe(CreateSongSchema))
  create(@Body() createSongDto: CreateSongDto, @Req() req: Request) {
    /*const validatedData = this.validationService.validateWithSchema(
      CreateSongSchema,
      req,
    );
    console.log(validatedData);
    console.log(req.body);*/
    console.log(req.body, req.url);
    console.log(createSongDto);
    return this.songService.create(createSongDto);
  }

  @Get(':id')
  findOne(@Param('id', new ZodValidationPipe(z.number().int())) id: number) {
    //return this.songService.findAll();

    return `id of type '${typeof id}'`;
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
