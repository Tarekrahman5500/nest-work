import { PlayListsService } from './playList.service';
import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { CreatePlayListDto, ICreatePlayList } from './dto/create.playList.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiResponse } from '../response/ApiResponse';

@Controller('playlists')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body(new ZodValidationPipe(CreatePlayListDto))
    playlistDTO: ICreatePlayList,
  ): Promise<ApiResponse<object>> {
    const newPlayList = await this.playListService.create(playlistDTO);
    const response: ApiResponse<object> = {
      statusCode: HttpStatus.CREATED,
      success: true,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Successfully create a playlist',
      data: [newPlayList],
      errors: [],
    };

    return response;
  }
}
