import express from 'express';
import loaders from './loaders';
import { UNHANDLED_REJECTION, UNCAUGHT_EXCEPTION } from './constants';
import handleCleanUp from './utils/handleCleanUp';

export const initializeApp = async () => {
  const app = express();
  process.on(UNHANDLED_REJECTION, handleCleanUp);
  process.on(UNCAUGHT_EXCEPTION, handleCleanUp);

  await loaders({ expressApp: app });
  return app;
};
