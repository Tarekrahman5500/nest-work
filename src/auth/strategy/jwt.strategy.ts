import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from '../auth.constants';
import { UserService } from '../../user/user.service';
import { UUID } from '../../common/constants/types/uuid';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.secret,
    });
  }

  async validate(payload: { sub: UUID; email: string }) {
    // console.log({ payload });
    const user = await this.userService.findOne(payload.sub);
    //  console.log(user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
