import { Injectable } from '@nestjs/common';

import { z } from 'nestjs-zod/z';
import { ZodValidationException } from 'nestjs-zod';
/*import { ZodValidationExceptionFilter } from './zodValidationException';*/

@Injectable()
export class ValidationService {
  validateWithSchema<T>(schema: z.ZodSchema<T>, req: Request): T {
    try {
      return schema.parse(req.body);
    } catch (error) {
      throw new ZodValidationException(error);
    }
  }
}
