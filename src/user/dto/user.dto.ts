import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { UUIDSchema } from '../../songs/dto/crate-song-dto';
import { CreatePlayListSchema } from '../../playlist/dto/create.playList.dto';
import { ApiProperty } from '@nestjs/swagger';

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the common fields schema
const userCommonFieldsSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export const userCreateSchema = userCommonFieldsSchema
  .extend({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm password must be at least 6 characters long',
    }),
  })
  .strip()
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ['confirmPassword'],
  });

export const userReturnSchema = userCommonFieldsSchema.extend({
  id: UUIDSchema,
  uid: z.number(),
  createdAt: z.dateString(),
  updatedAt: z.dateString(),
  // playLists: z.array(CreatePlayListSchema).nullable(),
});

export class UserCreateDto extends createZodDto(userCreateSchema) {}

export class UserReturnDto extends createZodDto(userReturnSchema) {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John', // Example of an example value
    required: true,
    maxLength: 50, // Example of maxLength validation
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: true,
    maxLength: 50,
  })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'password123', // Example of an example value
    required: true,
    minLength: 6, // Example of minLength validation
  })
  password: string;

  @ApiProperty({
    description: 'Confirmation of the password',
    example: 'password123',
    required: true,
    minLength: 6,
  })
  confirmPassword: string;
}
