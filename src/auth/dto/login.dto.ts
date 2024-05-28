import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

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
