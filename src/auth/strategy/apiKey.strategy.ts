import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from '../auth.service';
import { UUID } from '../../common/constants/types/uuid';
import { User } from '../../user/user.entity';
import { transformUser } from '../../user/utility/transformUse';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(key: UUID): Promise<Partial<User>> {
    const user: User = await this.authService.validateUserByApiKey(key);
    // console.log({ ...user, artistId: payload.artistId || null });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return transformUser(user);
  }
}
