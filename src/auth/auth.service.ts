import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { OmitPasswordUserPromise } from '../user/user.interface';
import { ILoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from '../artist/artist.service';
import { IPayload } from './types/types';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly artistService: ArtistService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<OmitPasswordUserPromise | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: ILoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    // now check user is artist or not
    //console.log(user);
    const artist = await this.artistService.findArtist(user.id);
    // console.log(artist);

    const payload: IPayload = { email: user.email, userId: user.id };
    if (artist) payload.artistId = artist.id;

    return {
      accessToken: this.jwtService.sign(payload),
    };

    //return user;
  }
}
