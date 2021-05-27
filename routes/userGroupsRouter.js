import express from 'express';
import ejValidator from 'express-joi-validation';
import { userGroupsSchema } from '../validation/schema';
import { UserGroupsService } from '../services';
import { UserGroupsModel } from '../models';

const userGroupsRouter = express.Router();
const validator = ejValidator.createValidator();

const userGroupsService = new UserGroupsService(UserGroupsModel);

userGroupsRouter.get('/usergroups', async (req, res) => {
  try {
    const userGroups = await userGroupsService.get();
    res.send(userGroups);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userGroupsRouter.post(
  '/usergroups',
  validator.body(userGroupsSchema),
  async (req, res) => {
    try {
      const {
        body: { groupId, userId },
      } = req;
      const response = await userGroupsService.addUsersToGroup(groupId, userId);
      res.send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
);

export default userGroupsRouter;
