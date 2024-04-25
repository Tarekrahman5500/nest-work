import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { z } from 'nestjs-zod/z';

@Injectable()
export class ZodSerializerInterceptor implements NestInterceptor {
  constructor(private readonly schema: z.ZodSchema<any>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.schema.safeParse(data).success
          ? data
          : this.schema.safeParse(data).data;
      }),
    );
  }
}
