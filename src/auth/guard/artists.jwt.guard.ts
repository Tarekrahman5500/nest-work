import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ArtistsJwtGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) throw err || new UnauthorizedException();
    console.log(user);
    if (user.artistId) return user;
    throw err || new UnauthorizedException();
  }
}
