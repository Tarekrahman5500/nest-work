import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from '../common/constants/base';
import { UuidService } from '../common/constants/UuidService';
import { UUID } from '../common/constants/types/uuid';
import { ISong } from './dto/song.interface';
import { v4 as uuidv4 } from 'uuid';
import { PlayList } from '../playlist/playList.entity';
import { Artist } from '../artist/artist.entity';
@Entity('songs')
export class Song extends Base implements ISong {
  constructor(private readonly uuidService: UuidService) {
    super();
  }
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'int', unique: true, generated: 'increment' })
  uid: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text' })
  lyrics: string | null;

  @ManyToOne(() => PlayList, (playList) => playList.songs)
  playList: PlayList;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songArtists' })
  artists: Artist[];
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
