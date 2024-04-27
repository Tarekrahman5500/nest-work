import { Injectable } from '@nestjs/common';

import { z } from 'nestjs-zod/z';

@Injectable()
export class ValidationService {
  validateWithSchema<T>(schema: z.ZodSchema<T>, data: any): T {
    try {
      console.log(data);
      const result = schema.safeParse(data);

      console.log(result.error);
      if (!result.success) {
        console.log('here');
        throw new CustomValidationException(result.error.issues); // Use custom exception
      }
      return result.data;
    } catch (error) {
      if (error instanceof CustomValidationException) {
        throw error; // Re-throw custom exception for ZodValidationExceptionFilter handling
      } else {
        throw error; // Re-throw non-validation errors
      }
    }
  }
}

export class CustomValidationException extends Error {
  constructor(public readonly errors: z.ZodIssue[]) {
    super('Validation failed');
  }
}
