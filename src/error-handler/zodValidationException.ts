import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { CustomValidationException } from './validationService';

@Catch(CustomValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: CustomValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = HttpStatus.BAD_REQUEST;

    // Construct user-friendly error messages
    const userFriendlyErrors = exception.errors.map((error) => {
      const path = error.path.join('.');
      const message = error.message;
      return { path, message };
    });

    const errorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      errors: userFriendlyErrors,
    };

    response.status(statusCode).json(errorResponse);
  }
}
