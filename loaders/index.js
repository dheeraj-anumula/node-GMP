/* eslint-disable no-console */
import expressLoader from './express';
import sequelizeLoader from './sequelize';
import { logger } from './logger';

export default async ({ expressApp }) => {
  await sequelizeLoader();
  logger.info('Sequelize Initialized');
  await expressLoader({ app: expressApp });
  logger.info('Express Initialized');
};
