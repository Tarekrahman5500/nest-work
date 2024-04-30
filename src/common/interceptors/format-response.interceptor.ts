// src/common/interceptors/format-response.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../response/ApiResponse';
import { isApiResponse } from './isApiResponse';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  constructor(private readonly successMessage: string = 'Success') {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode || HttpStatus.OK;

        if (isApiResponse(value)) {
          return value;
        }

        const successResponse: ApiResponse<object> = {
          statusCode,
          success: true,
          timestamp: new Date().toISOString(),
          path: ctx.getRequest().url,
          message: this.successMessage,
          data: value,
          errors: null,
        };
        return successResponse;
      }),
    );
  }
}
