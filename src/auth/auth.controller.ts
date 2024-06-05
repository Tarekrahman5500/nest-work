import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ICreateUser, UserCreateDto } from '../user/dto/user.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { IUser, OmitPasswordUserPromise } from '../user/user.interface';
import { ILoginDto, LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { CustomRequest } from '../common/constants/custom.request';
import { Enable2FAType } from './types/types';
import { ITokenDto, TokenDTO } from './dto/token.dto';
import { UpdateResult } from 'typeorm';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  // @ZodSerializerDto(UserReturnDto)
  async signup(
    @Body(new ZodValidationPipe(UserCreateDto)) userDTO: ICreateUser,
  ): Promise<OmitPasswordUserPromise | null> {
    try {
      return await this.userService.createUser(userDTO);
    } catch (err) {
      throw err;
    }
  }

  @Post('login')
  async login(@Body(new ZodValidationPipe(LoginDto)) loginDTO: ILoginDto) {
    return await this.authService.login(loginDTO);
  }

  @Get('enable-2fa')
  @UseGuards(JwtGuard)
  async enable2FA(@Request() request: CustomRequest): Promise<Enable2FAType> {
    return await this.authService.enable2FA(request.user.id);
  }

  @Get('disable-2fa')
  @UseGuards(JwtGuard)
  disable2FA(@Request() request: CustomRequest): Promise<UpdateResult> {
    return this.authService.disable2FA(request.user.id);
  }

  @Post('validate-2fa')
  @UseGuards(JwtGuard)
  async validate2FA(
    @Request() request: CustomRequest,
    @Body(new ZodValidationPipe(TokenDTO)) tokenDTO: ITokenDto,
  ): Promise<{ verified: boolean }> {
    //console.log('validate2FA', tokenDTO);
    return await this.authService.validate2FA(request.user.id, tokenDTO.token);
  }

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Request() request: CustomRequest): IUser {
    return request.user;
  }
}
