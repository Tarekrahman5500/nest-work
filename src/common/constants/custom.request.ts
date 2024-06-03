import { IUser } from '../../user/user.interface';
import { Request } from '@nestjs/common';
export interface CustomRequest extends Request {
  user: IUser;
}
