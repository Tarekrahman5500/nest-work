import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from '../common/constants/types/uuid';
import { Base } from '../common/constants/base';
import { User } from '../user/user.entity';

@Entity('artists')
export class Artist extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'int', unique: true, generated: 'increment' })
  uid: number;

  @OneToOne(() => User, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;
}
