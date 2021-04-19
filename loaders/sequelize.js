import { Sequelize } from 'sequelize';
import config from '../config';

export const sequelize = new Sequelize(config.databaseURL);
export default async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
