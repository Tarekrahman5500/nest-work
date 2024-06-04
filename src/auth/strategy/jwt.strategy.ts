import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from '../auth.constants';
import { UserService } from '../../user/user.service';
import { IPayload } from '../types/types';
import { User } from '../../user/user.entity';
import { transformUser } from '../../user/utility/transformUse';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.secret,
    });
  }

  async validate(payload: IPayload) {
    // console.log({ payload });
    const user: User = await this.userService.findOne(payload.userId);
    // console.log({ ...user, artistId: payload.artistId || null });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { ...transformUser(user), artistId: payload.artistId };
  }
}
