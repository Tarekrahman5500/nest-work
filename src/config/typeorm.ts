import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { join } from 'path';

// Determine if the environment is production or development
const isProduction = process.env.NODE_ENV === 'production';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'tarek17',
  database: 'spotify-clone',
  synchronize: false,
  logging: true, // Enable logging for debugging purposes

  // Use different paths for entities and migrations based on the environment
  entities: [
    isProduction
      ? join(__dirname, '**/*.entity.js') // For production: compiled JS files
      : join(__dirname, '**/*.entity.ts'), // For development: TypeScript files
  ],
  migrations: [
    isProduction
      ? join(__dirname, '../migrations/*.js') // For production: compiled JS files in `dist/migrations`
      : join(__dirname, '../migrations/*.ts'), // For development: TypeScript files in `src/migrations`
  ],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
