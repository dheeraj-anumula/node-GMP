import express from 'express';
import { groupRouter, UserGroupsRouter, userRouter } from '../routes';

export default async ({ app }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.use(express.json());
  app.use(userRouter);
  app.use(groupRouter);
  app.use(UserGroupsRouter);
  return app;
};
