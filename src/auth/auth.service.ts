import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { OmitPasswordUserPromise } from '../user/user.interface';
import { ILoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from '../artist/artist.service';
import { Enable2FAType, IPayload, LoginReturn } from './types/types';
import { UUID } from '../common/constants/types/uuid';
import * as speakeasy from 'speakeasy';
import { User } from '../user/user.entity';
import { UpdateResult } from 'typeorm';

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

  async login(loginDto: ILoginDto): Promise<LoginReturn> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    // now check user is artist or not
    //console.log(user);
    const artist = await this.artistService.findArtist(user.id);
    // console.log(artist);

    const payload: IPayload = { email: user.email, userId: user.id };
    if (artist) payload.artistId = artist.id;

    // if user enable 2fa send hi a link

    if (user.enable2FA) {
      return {
        validate2FA: 'http://localhost:8080/auth/validate-2fa',
        message: 'Please sends the one time password from your google app',
      };
    }

    return {
      accessToken: this.jwtService.sign(payload),
    };

    //return user;
  }

  async enable2FA(userId: UUID): Promise<Enable2FAType> {
    const user = await this.userService.findOne(userId);

    if (!user) new NotFoundException(`user with ${userId} not found`);

    if (user.enable2FA) return { secret: user.twoFASecret };

    // if not enable just create one

    const secret = speakeasy.generateSecret();
    console.log(secret);

    const updateUser = await this.userService.updateUserSecretKey(
      userId,
      secret.base32,
    );
    return { secret: updateUser.twoFASecret };
  }

  async validate2FA(
    userId: UUID,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      const user = await this.userService.findOne(userId);

      //  console.log(token);

      // now verify user secret with token

      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token,
        encoding: 'base32',
      });

      return { verified };
    } catch (error) {
      throw new UnauthorizedException('Failed to verify token');
    }
  }

  async disable2FA(userId: UUID): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }
}
