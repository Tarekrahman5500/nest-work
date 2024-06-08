import { Injectable } from '@nestjs/common';
import validateEnv from './validateEnv';

@Injectable()
export class EnvConfigService {
  // Define the type of validateEnvConfig based on the shape of validateEnv
  private readonly validateEnvConfig: typeof validateEnv;

  constructor() {
    // Assign validateEnv to the class property using 'this'
    this.validateEnvConfig = validateEnv;
  }

  getValidateEnvConfig() {
    return this.validateEnvConfig;
  }
}
