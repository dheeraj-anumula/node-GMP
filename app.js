/* eslint-disable no-console */
import express from 'express';
import loaders from './loaders';
import config from './config';
import { logger } from './middlewares/logger';
import {
  ENV_PORT_UNDEF,
  UNHANDLED_REJECTION,
  UNCAUGHT_EXCEPTION,
} from './constants';
import handleCleanUp from './utils/handleCleanUp';

async function startServer() {
  const app = express();
  process.on(UNHANDLED_REJECTION, handleCleanUp);
  process.on(UNCAUGHT_EXCEPTION, handleCleanUp);

  await loaders({ expressApp: app });

  app.listen(config.port, (err) => {
    if (err) {
      logger.error(err);
      return;
    }
    if (!config.port) {
      logger.error(ENV_PORT_UNDEF);
      return;
    }
    logger.info(`Your server is ready at ${config.port}!`);
  });
}

startServer();
