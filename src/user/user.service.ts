import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUser } from './dto/user.dto';
import { IUser, OmitPasswordUserPromise } from './user.interface';
import { classToPlain } from 'class-transformer';
import { UUID } from '../common/constants/types/uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(id: UUID): Promise<IUser | null> {
    const user = await this.userRepository.findBy({ id });
    return user?.[0] ?? null;
  }

  async createUser(
    userDTO: ICreateUser,
  ): Promise<OmitPasswordUserPromise | null> {
    // Use Omit to remove the confirmPassword field
    const validatedUserData: Omit<ICreateUser, 'confirmPassword'> = userDTO;

    // Create a new user instance
    const user = this.userRepository.create(validatedUserData);
    // Object.assign(user, validatedUserData);

    // Save the user (assuming you have a userRepository)
    await this.userRepository.save(user);

    // Return the saved user
    // console.log(user.id);
    return await this.findOne(user.id);
  }
}
