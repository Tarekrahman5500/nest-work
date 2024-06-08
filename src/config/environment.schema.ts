// Define your environment schema using Zod
import { z } from 'znv';
import * as dotenv from 'dotenv';

// Load environment variables from .env files
//dotenv.config({ path: '.env' });
//dotenv.config({ path: '.env.development', override: true }); // Override with development env if exists

// Parse command line arguments to get the environment flag
const args = process.argv.slice(2);
const envIndex = args.findIndex((arg) => arg.startsWith('--env='));
const selectedEnv =
  envIndex !== -1 ? args[envIndex].split('=')[1] : 'development'; // Default to development if not provided

// Load environment variables from .env files based on the selected environment
dotenv.config({
  path: selectedEnv === 'production' ? '.env' : '.env.development',
});

const environmentSchema = {
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'PORT must be a valid number',
    }),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('5432')
    .refine((val) => !isNaN(val), {
      message: 'DB_PORT must be a valid number',
    }),
  DB_USERNAME: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('password'),
  DB_DATABASE: z.string().default('database_name'),
  NODE_ENV: z.string().default('development'),
  // Add more environment variables and validations as needed
};

export default environmentSchema;
