import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './strategy';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: authConstants.expiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
