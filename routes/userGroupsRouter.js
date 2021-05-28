import express from 'express';
import ejValidator from 'express-joi-validation';
import { userGroupsSchema } from '../validation/schema';
import { UserGroupsService } from '../services';
import { UserGroupsModel } from '../models';
import { logRequest, logError } from '../loaders/logger';

const userGroupsRouter = express.Router();
const validator = ejValidator.createValidator();

const userGroupsService = new UserGroupsService(UserGroupsModel);

userGroupsRouter.get('/usergroups', logRequest, async (req, res, next) => {
  try {
    const userGroups = await userGroupsService.get();
    res.send(userGroups);
  } catch (error) {
    logError(error, req, res, next);
    res.status(error.status || 500).send(error.message);
  }
});

userGroupsRouter.post(
  '/usergroups',
  logRequest,
  validator.body(userGroupsSchema),
  async (req, res, next) => {
    try {
      const {
        body: { groupId, userId },
      } = req;
      const response = await userGroupsService.addUsersToGroup(groupId, userId);
      res.send(response);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

export default userGroupsRouter;
