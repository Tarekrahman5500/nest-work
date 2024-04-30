import { ApiResponse } from '../../response/ApiResponse';

export function isApiResponse(value: any): value is ApiResponse<object> {
  return (
    typeof value === 'object' &&
    'statusCode' in value &&
    'success' in value &&
    'timestamp' in value &&
    'path' in value &&
    'message' in value &&
    'data' in value &&
    'errors' in value
  );
}
