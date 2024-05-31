import { UUID } from '../../common/constants/types/uuid';

export interface IPayload {
  email: string;
  userId: UUID;
  artistId?: UUID;
}
