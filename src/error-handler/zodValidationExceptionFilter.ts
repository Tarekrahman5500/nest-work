import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { ZodValidationException } from 'nestjs-zod';

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
    //console.log(errorData.issues);
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
      if (firstError.path.includes('params')) {
        const [param, location] = firstError.path;

        firstError.message = `${location} is ${firstError.message.toLowerCase()} in ${param}`;

        //console.log(firstError.message)
      } else if (firstError.code === 'custom') {
        firstError.message = `${firstError.message}`;
      } else if (firstError.message.toLowerCase() === 'required') {
        firstError.message = `field ${
          firstError.path
        } is ${firstError.message.toLowerCase()}`;
      } /*else if (firstError.message.includes('must contain at least')) {

                firstError.message = `${firstError.message.toLowerCase()}`

            }*/ else if (firstError.message.includes('must contain')) {
        // console.log('here')

        firstError.message = `${
          firstError.path
        } is ${firstError.message.toLowerCase()}`;
      } else if (firstError.message.includes('Invalid')) {
        //  console.log('here')

        //  console.log({path:firstError.path})

        firstError.message = `${
          firstError.path
        } has ${firstError.message.toLowerCase()}`;
      } else if (firstError.message.includes('not match')) {
        firstError.message = `${
          firstError.path
        } is ${firstError.message.toLowerCase()}`;
      } else if (firstError.message.includes('Expected')) {
        firstError.message = `${
          firstError.path
        } ${firstError.message.toLowerCase()}`;
      } else if (firstError.path === '') {
        const match = firstError.message.match(/'(.+?)'/);
        firstError.message = match
          ? `unknown filed ${match[1]} in request body`
          : firstError.message;
      } else {
        firstError.message = `${firstError.path} ${firstError.message}`;
      }

      console.log(firstError);
      const errorResponse = {
        statusCode,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
        message: firstError.message,
        data: [],
        errors: errorData,
      };

      response.status(statusCode).json(errorResponse);
    }
  }
}
