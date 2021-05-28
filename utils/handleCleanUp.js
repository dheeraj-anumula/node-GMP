import { CONNECTION_CLOSE_FAIL } from '../constants';
import { logger } from '../loaders/logger';
import { closeConnection } from '../loaders/sequelize';

const handleCleanUp = async () => {
  try {
    await closeConnection();
  } catch (error) {
    logger.error(`${CONNECTION_CLOSE_FAIL} ${JSON.stringify(error)}`);
  }
  process.exit(1);
};

export default handleCleanUp;
