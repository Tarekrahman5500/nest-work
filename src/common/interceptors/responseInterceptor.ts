import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { ApiResponse } from '../../response/ApiResponse';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const statusCode = ctx.getResponse().statusCode;

    return next.handle().pipe(
      map((data) => {
        const response: ApiResponse<object> = {
          statusCode,
          success: true,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Operation successful',
          data: Array.isArray(data) ? data : [data],
          errors: [],
        };
        return response;
      }),
    );
  }
}
