import { IBase } from '../../common/constants/types/base';
import { UUID } from '../../common/constants/types/uuid';
import { IArtist } from '../../artist/artist.entity';

export interface ISong extends IBase {
  id: UUID;
  uid: number;
  title: string;
  artists: IArtist[] | null;
  releasedDate: Date;
  duration: Date;
  lyrics: string | null;
}
