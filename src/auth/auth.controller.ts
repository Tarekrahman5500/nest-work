import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  ICreateUser,
  UserCreateDto,
  UserReturnDto,
} from '../user/dto/user.dto';
import { ZodSerializerDto, ZodValidationPipe } from 'nestjs-zod';
import { ApiResponse } from '../response/ApiResponse';
import { IUser, OmitPasswordUserPromise } from '../user/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  // @ZodSerializerDto(UserReturnDto)
  async signup(
    @Req() req: Request,
    @Body(new ZodValidationPipe(UserCreateDto)) userDTO: ICreateUser,
  ): Promise<OmitPasswordUserPromise | null> {
    try {
      return await this.userService.createUser(userDTO);
    } catch (err) {
      throw err;
    }
  }
}
