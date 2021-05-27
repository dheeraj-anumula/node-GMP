import express from 'express';
import ejValidator from 'express-joi-validation';
import { groupSchema } from '../validation/schema';
import { GroupService } from '../services';
import { GroupModel } from '../models';

const groupRouter = express.Router();
const validator = ejValidator.createValidator();

const groupService = new GroupService(GroupModel);

groupRouter.get('/groups', async (req, res) => {
  try {
    const groups = await groupService.get();
    res.send(groups);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupRouter.get('/groups/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const group = await groupService.getById(id);
    res.send(group);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupRouter.post('/groups', validator.body(groupSchema), async (req, res) => {
  try {
    const { body: group } = req;
    const response = await groupService.create(group);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupRouter.delete('/groups/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await groupService.delete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupRouter.put(
  '/groups/:id',
  validator.body(groupSchema),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body: group } = req;
      const response = await groupService.update(id, group);
      res.send(`${response[0]} group(s) updated`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
);

export default groupRouter;
