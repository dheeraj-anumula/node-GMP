import express from 'express';
import ejValidator from 'express-joi-validation';
import { groupSchema } from '../validation/schema';
import { GroupService } from '../services';
import { GroupModel } from '../models';
import { logRequest, logError } from '../middlewares/logger';
import verifyToken from '../middlewares/verifyToken';

const groupRouter = express.Router();
const validator = ejValidator.createValidator();

const groupService = new GroupService(GroupModel);

groupRouter.get('/groups', logRequest, verifyToken, async (req, res, next) => {
  try {
    const groups = await groupService.get();
    res.send(groups);
  } catch (error) {
    logError(error, req, res, next);
    res.status(error.status || 500).send(error.message);
  }
});

groupRouter.get(
  '/groups/:id',
  logRequest,
  verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const group = await groupService.getById(id);
      res.send(group);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

groupRouter.post(
  '/groups',
  logRequest,
  verifyToken,
  validator.body(groupSchema),
  async (req, res, next) => {
    try {
      const { body: group } = req;
      const response = await groupService.create(group);
      res.send(response);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

groupRouter.delete(
  '/groups/:id',
  logRequest,
  verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await groupService.delete(id);
      res.sendStatus(200);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

groupRouter.put(
  '/groups/:id',
  logRequest,
  verifyToken,
  validator.body(groupSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body: group } = req;
      const response = await groupService.update(id, group);
      res.send(`${response[0]} group(s) updated`);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

export default groupRouter;
