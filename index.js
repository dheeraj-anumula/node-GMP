/* eslint-disable no-console */
import config from './config';
import { logger } from './middlewares/logger';
import { ENV_PORT_UNDEF } from './constants';
import { initializeApp } from './app';

const startServer = async () => {
  const app = await initializeApp();

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
};
startServer();
