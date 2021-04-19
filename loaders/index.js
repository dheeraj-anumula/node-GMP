import expressLoader from './express';
import sequelizeLoader from './sequelize';

export default async ({ expressApp }) => {
  await sequelizeLoader();
  console.log('Sequelize Initialized');
  await expressLoader({ app: expressApp });
  console.log('Express Initialized');
};
