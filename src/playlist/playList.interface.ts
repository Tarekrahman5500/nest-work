import { UUID } from '../common/constants/types/uuid';
import { ISong } from '../songs/dto/song.interface';
import { IBase } from '../common/constants/types/base';
import { IUser } from '../user/user.dto';

export interface IPlayList extends IBase {
  id: UUID;
  uid: number;
  name: string;
  songs: ISong[]; // Ensure you have an ISong interface defined
  user: IUser;
}
