import { IBase } from '../common/constants/types/base';
import { UUID } from '../common/constants/types/uuid';
import { IPlayList } from '../playlist/playList.interface';
import { Column } from 'typeorm';

export interface IUser extends IBase {
  id: UUID;
  uid: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  apiKey: UUID;
  phone: string | null;
  twoFASecret: string | null;
  enable2FA: boolean;
  playLists: IPlayList[] | null;
}

export type OmitPasswordUserPromise = Promise<Omit<IUser, 'password'>>;
