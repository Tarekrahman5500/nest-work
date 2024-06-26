import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

export const loginSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  })
  .strict();

export class LoginDto extends createZodDto(loginSchema) {}

export interface ILoginDto {
  email: string;
  password: string;
}

export class LoginDtoApiRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    type: String,
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    type: String,
    minLength: 6,
  })
  password: string;
}
