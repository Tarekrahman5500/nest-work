import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

@Injectable()
export class ZodValidationFilterPipe implements PipeTransform {
  constructor(
    private readonly schema: z.ZodType<any, any>,
    private readonly request: Request,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      console.log(value, this.request);
      const validatedValue = this.schema.parse(value);
      return validatedValue;
    } catch (error) {
      throw new ZodValidationException(error);
    }
  }
}
