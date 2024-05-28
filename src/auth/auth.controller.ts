import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ICreateUser, UserCreateDto } from '../user/dto/user.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { OmitPasswordUserPromise } from '../user/user.interface';
import { ILoginDto, LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

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
}
