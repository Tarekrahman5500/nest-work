import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
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
  async findOne(id: UUID): Promise<User | null> {
    const user = await this.userRepository.findBy({ id });
    return user?.[0] ?? null;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.userRepository.findBy({ email });
    return user?.[0] ?? undefined;
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

  // update user secret key

  async updateUserSecretKey(userId: UUID, secretKey: string): Promise<User> {
    const updateUser = await this.userRepository.update(
      { id: userId },
      { twoFASecret: secretKey, enable2FA: true },
    );

    console.log(updateUser);

    //if (updateUser.affected)

    return await this.findOne(userId);
  }

  async disable2FA(id: UUID): Promise<UpdateResult> {
    return await this.userRepository.update(
      { id },
      { enable2FA: false, twoFASecret: null },
    );
  }

  async findByApiKey(apiKey: UUID): Promise<User> {
    return await this.userRepository.findOneBy({ apiKey });
  }
}
