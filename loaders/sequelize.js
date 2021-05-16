/* eslint-disable no-console */
import { Sequelize } from 'sequelize';
import config from '../config';
import { CONNECTION_FAIL, CONNECTION_SUCCESS } from '../constants';

export const sequelize = new Sequelize(config.databaseURL);
export default async () => {
  try {
    await sequelize.authenticate();
    console.log(CONNECTION_SUCCESS);
  } catch (error) {
    console.error(CONNECTION_FAIL, error);
  }
  return sequelize;
};
