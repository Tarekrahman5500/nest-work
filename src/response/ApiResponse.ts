// response.interface.ts

import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T extends object> {
  statusCode: HttpStatus;
  success: boolean;
  timestamp: string;
  path: string;
  message: string;
  data: T[];
  errors: T[];
}
