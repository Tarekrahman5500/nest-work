import { parseEnv } from 'znv';
import environmentSchema from './environment.schema';

//
const validateEnv = parseEnv(process.env, environmentSchema);

export default validateEnv;
