import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ZodValidationExceptionFilter } from '../../error-handler/zodValidationExceptionFilter';
import { ZodValidationException } from 'nestjs-zod';
import { TypeOrmExceptionFilter } from '../../response/typeorm-exception.filter';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const zodFilter = new ZodValidationExceptionFilter();
    if (exception instanceof ZodValidationException) {
      zodFilter.catch(exception, host);
      return;
    }

    const ormFilter = new TypeOrmExceptionFilter();
    if (exception instanceof QueryFailedError) {
      ormFilter.catch(exception, host);
      return;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    const errors: any[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      data: [],
      errors,
    });
  }
}
