/* eslint-disable no-console */
import express from 'express';
import loaders from './loaders';
import config from './config';

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready at ${config.port} !`);
  });
}

startServer();
