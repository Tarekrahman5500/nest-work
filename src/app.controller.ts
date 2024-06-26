import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './auth/guard/jwt.guard';
import { EnvConfigService } from './config/env.config.service';
import { CustomRequest } from './common/constants/custom.request';
import { ApiBasicAuth } from '@nestjs/swagger';

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
  @ApiBasicAuth('JWT-auth')
  @UseGuards(JwtGuard)
  getProfile(@Request() request: CustomRequest) {
    //delete request.user?.password;
    const envConfig = this.envConfigService.getValidateEnvConfig();
    console.log('Validated Environment Configuration:', envConfig);
    return request.user;
  }
}
