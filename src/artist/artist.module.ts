import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
