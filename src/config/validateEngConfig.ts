import { registerAs } from '@nestjs/config';
import validateEnv from './validateEnv';

export default registerAs('validateEnv', () => validateEnv);
