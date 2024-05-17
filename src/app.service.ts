import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/devConfigService';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG') private config: { port: string },
  ) {}

  getHello(): string {
    return `Hello World with nest ${this.devConfigService.getDB_HOST()} PORT = ${
      this.config.port
    }`;
  }
}
