// response/response.service.ts

import { Injectable, HttpStatus } from '@nestjs/common';
import { ApiResponse } from './ApiResponse';

@Injectable()
export class ResponseService {
  generateResponse(
    statusCode: HttpStatus,
    success: boolean,
    message: string,
    data: any,
    errors: any,
    requestUrl: string,
  ): ApiResponse<object> {
    return {
      statusCode: statusCode,
      success: success,
      timestamp: new Date().toISOString(),
      path: requestUrl,
      message: message,
      data: data,
      errors: errors,
    };
  }
}
