import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from '../common/constants/types/uuid';
import { Base } from '../common/constants/base';
import { User } from '../user/user.entity';
import { Song } from '../songs/song.entity';

export interface IArtist {
  id: string; // UUID
  uid: number;
  user: User | null; // OneToOne relationship with User, nullable due to 'SET NULL' on delete
  songs: Song[] | null; // ManyToMany relationship with Song
}
@Entity('artists')
export class Artist extends Base implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'int', unique: true, generated: 'increment' })
  uid: number;

  @OneToOne(() => User, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
