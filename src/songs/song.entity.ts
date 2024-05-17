import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../common/constants/base';
import { UuidService } from '../common/constants/UuidService';
import { UUID } from '../common/constants/types/uuid';
import { ISong } from './dto/song.interface';
import { v4 as uuidv4 } from 'uuid';
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

  @Column('varchar', { array: true })
  artists: string[];

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text' })
  lyrics: string | null;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
