import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
  DB_HOST = 'localhost';

  getDB_HOST(): string {
    return this.DB_HOST;
  }
}
