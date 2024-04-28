import { Injectable } from '@nestjs/common';

import { z, ZodError } from 'nestjs-zod/z';
import { ZodValidationException } from 'nestjs-zod';
/*import { ZodValidationExceptionFilter } from './zodValidationException';*/

@Injectable()
export class ValidationService {
  validateWithSchema<T>(schema: z.ZodSchema<T>, data: any): T {
    try {
      console.log(data);
      return schema.parse(data);
    } catch (error) {
      throw new ZodValidationException(error);
    }
  }
}
