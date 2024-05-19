import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from '../common/constants/types/uuid';
import { Base } from '../common/constants/base';
import { PlayList } from '../playlist/playList.entity';

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'int', unique: true, generated: 'increment' })
  uid: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToMany(() => PlayList, (playList) => playList.songs)
  playLists: PlayList[];
}
