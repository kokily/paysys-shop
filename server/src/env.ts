import dotenv from 'dotenv';
import path from 'path';
import { PROD_MODE } from './constants';

dotenv.config({
  path: path.resolve(process.cwd(), PROD_MODE ? '.env' : '.env.test'),
});
