import { IBase } from '../../common/constants/types/base';
import { UUID } from '../../common/constants/types/uuid';

export interface ISong extends IBase {
  id: UUID;
  uid: number;
  title: string;
  artists: string[];
  releasedDate: Date;
  duration: Date;
  lyrics: string | null;
}
