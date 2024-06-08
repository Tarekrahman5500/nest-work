import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { join } from 'path';
import validateEnv from './validateEnv';

// Determine if the environment is production or development
const isProduction = validateEnv.NODE_ENV === 'development';

console.log(isProduction);

//console.log(validateEnv);

const config: DataSourceOptions = {
  type: 'postgres',
  host: validateEnv.DB_HOST,
  port: validateEnv.DB_PORT,
  username: validateEnv.DB_USERNAME,
  password: validateEnv.DB_PASSWORD,
  database: validateEnv.DB_DATABASE,
  synchronize: false,
  logging: true, // Enable logging for debugging purposes

  // Use different paths for entities and migrations based on the environment
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [join(__dirname, '/../migrations/*.{js,ts}')],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
