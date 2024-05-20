import { IBase } from '../common/constants/types/base';
import { UUID } from '../common/constants/types/uuid';
import { IPlayList } from '../playlist/playList.interface';

export interface IUser extends IBase {
  id: UUID;
  username: string;
  email: string;
  playLists: IPlayList[];
}
