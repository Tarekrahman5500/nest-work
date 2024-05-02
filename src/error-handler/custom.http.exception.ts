import { ApiResponse } from '../response/ApiResponse';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isApiResponse } from '../common/interceptors/isApiResponse';

export class CustomHttpException extends HttpException {
  constructor(
    message: string | ApiResponse<object>,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    let defaultResponse: ApiResponse<object>;
    const responseChecker = isApiResponse(message);
    if (!responseChecker) {
      defaultResponse = {
        statusCode: status,
        success: false,
        timestamp: new Date().toISOString(),
        path: 'not provided',
        message: message,
        data: [],
        errors: [],
      };
    } else {
      status = message.statusCode;
    }

    defaultResponse = responseChecker ? message : defaultResponse;
    super(defaultResponse, status);
  }
}
