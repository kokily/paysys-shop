import { createConnection } from 'typeorm';
import https from 'https';
import http from 'http';
import fs from 'fs';
import './env';
import app from './app';
import { ENV } from './constants';
import ConnectionOptions from './ormConfig';

// SSL Config
const configurations = {
  production: { ssl: true, port: 443, hostname: 'dnkdream.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' },
};

const environment = ENV.NODE_ENV || 'production';
const config = configurations[environment];

let server;

if (config.ssl) {
  server = https.createServer(
    {
      key: fs.readFileSync(`${ENV.SSL_KEY}`),
      cert: fs.readFileSync(`${ENV.SSL_CERT}`),
    },
    app.callback()
  );
} else {
  server = http.createServer(app.callback());
}

createConnection(ConnectionOptions)
  .then(() => {
    server.listen(config.port, () => console.log(`Apollo Server on ${config.port} port`));
  })
  .catch((err) => console.error(err));
