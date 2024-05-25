import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from '../common/constants/types/uuid';
import { Base } from '../common/constants/base';
import { PlayList } from '../playlist/playList.entity';
import { IUser } from './user.interface';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';

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
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => PlayList, (playList) => playList.songs)
  playLists: PlayList[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
