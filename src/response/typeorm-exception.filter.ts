// src/filters/typeorm-exception.filter.ts

import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { ApiResponse } from './ApiResponse';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message = 'Internal server error';

    // Check the specific error code and set the message accordingly
    // Access the driverError property which contains the code
    const driverError = (exception as any).driverError;
    if (driverError && driverError.code === '23505') {
      statusCode = HttpStatus.CONFLICT;
      message = 'Conflict: Duplicate entry';
    }

    const defaultResponse: ApiResponse<object> = {
      statusCode,
      success: false,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: message,
      data: [],
      errors: [driverError],
    };

    response.status(statusCode).json(defaultResponse);
  }
}
