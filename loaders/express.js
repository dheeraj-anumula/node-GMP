import express from 'express';
import userRouter from '../routes/userRouter';

export default async ({ app }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.use(express.json());
  app.use(userRouter);

  return app;
};
