/* eslint-disable no-console */
import expressLoader from './express';
import sequelizeLoader from './sequelize';
import { logger } from '../middlewares/logger';

export default async ({ expressApp }) => {
  await sequelizeLoader();
  logger.info('Sequelize Initialized');
  await expressLoader({ app: expressApp });
  logger.info('Express Initialized');
};
