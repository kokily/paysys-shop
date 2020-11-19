import { ConnectionOptions } from 'typeorm';
import { ENV } from './constants';
import entities from './entities';

const ConnectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  synchronize: true,
  entities,
  database: ENV.DB_DATABASE,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
};

export default ConnectionOptions;
