import { createConnection } from 'typeorm';
import './env';
import app from './app';
import { ENV } from './constants';
import ConnectionOptions from './ormConfig';

const port = ENV.PORT;

createConnection(ConnectionOptions)
  .then(() => {
    app.listen(port, () => console.log(`Apollo Server on ${port} port`));
  })
  .catch((err) => console.error(err));
