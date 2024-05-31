import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './auth/guard/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() request) {
    //delete request.user?.password;
    return request.user;
  }
}
