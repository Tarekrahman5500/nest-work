import { plainToClass } from 'class-transformer';
import { User } from '../user.entity';

export function transformUser(user: User) {
  return plainToClass(User, user);
}
