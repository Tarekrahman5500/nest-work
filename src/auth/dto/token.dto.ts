import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const TokenSchema = z
  .object({
    token: z
      .string()
      .min(3, { message: 'Token must be at least 3 characters long' }),
  })
  .strict();

export class TokenDTO extends createZodDto(TokenSchema) {}

export interface ITokenDto {
  token: string;
}
