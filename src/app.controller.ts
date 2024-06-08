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
import { EnvConfigService } from './config/env.config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() request) {
    //delete request.user?.password;
    const envConfig = this.envConfigService.getValidateEnvConfig();
    console.log('Validated Environment Configuration:', envConfig);
    return request.user;
  }
}
