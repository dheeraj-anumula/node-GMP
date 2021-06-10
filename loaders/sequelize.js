/* eslint-disable no-console */
import { Sequelize } from 'sequelize';
import config from '../config';
import {
  CONNECTION_FAIL,
  CONNECTION_SUCCESS,
  CONNECTION_CLOSED,
} from '../constants';
import { logger } from './logger';

export const sequelize = new Sequelize(config.databaseURL, {
  logging: (msg) => logger.info(msg),
});
export default async () => {
  try {
    await sequelize.authenticate();
    logger.info(CONNECTION_SUCCESS);
  } catch (error) {
    logger.error(CONNECTION_FAIL, error);
  }
  return sequelize;
};

export const closeConnection = async () => {
  await sequelize.connectionManager.close();
  logger.info(CONNECTION_CLOSED);
};
