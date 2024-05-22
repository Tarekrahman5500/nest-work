import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from '../common/constants/types/uuid';
import { Base } from '../common/constants/base';
import { PlayList } from '../playlist/playList.entity';
import { IUser } from './user.interface';

@Entity('users')
export class User extends Base implements IUser {
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
