import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { ZodValidationException } from 'nestjs-zod';
import { ApiResponse } from '../response/ApiResponse';

interface ValidationError {
  message: string;
  path: string | string[];
  code: string;
}

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorData = exception.getZodError();

    //console.log(errorData, response);
    const validationErrors = errorData.issues.map((issue) => {
      const pathSegments = issue.path.join('.').split('.');
      const path = pathSegments.includes('params')
        ? pathSegments
        : pathSegments.pop();
      return {
        path,
        message: issue.message,
        code: issue.code,
      };
    });

    const statusCode = exception.getStatus() || HttpStatus.BAD_REQUEST;

    let firstError: ValidationError = {
      message: exception.message,
      path: '',
      code: '',
    };

    //console.log({ length: validationErrors.length });
    if (validationErrors.length > 0) {
      firstError = validationErrors[0];
      const lowerCaseMessage = firstError.message.toLowerCase();
      switch (true) {
        case firstError.path.includes('params'):
          const [param, location] = firstError.path;
          firstError.message = `${location} is ${lowerCaseMessage} in ${param}`;
          break;
        case firstError.code === 'custom':
          firstError.message = `${firstError.message}`;
          break;
        case lowerCaseMessage === 'required':
          firstError.message = `field ${firstError.path} is ${lowerCaseMessage}`;
          break;
        case lowerCaseMessage.includes('must contain'):
        case lowerCaseMessage.includes('invalid'):
        case lowerCaseMessage.includes('not match'):
        case lowerCaseMessage.includes('expected'):
          firstError.message = `${firstError.path} ${lowerCaseMessage}`;
          break;
        case firstError.path === '':
          const match = firstError.message.match(/'(.+?)'/);
          firstError.message = match
            ? `unknown field ${match[1]} in request body`
            : firstError.message;
          break;
        default:
          break;
      }
    } else {
      firstError.message = `${firstError.path} ${firstError.message}`;
    }

    console.log(firstError);
    const errorResponse: ApiResponse<object> = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      success: false,
      message: firstError.message,
      data: [],
      errors: errorData.issues,
    };
    //return errorResponse;
    response.status(statusCode).json(errorResponse);
  }
}
