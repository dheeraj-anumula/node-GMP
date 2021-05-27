import express from 'express';
import ejValidator from 'express-joi-validation';
import { userSchema } from '../validation/schema';
import { UserService } from '../services';
import { UserModel } from '../models';

const userRouter = express.Router();
const validator = ejValidator.createValidator();

const userService = new UserService(UserModel);

userRouter.get('/users', async (req, res) => {
  try {
    const { limit, login } = req.query;
    const response = await userService.getAutoSuggestUsers(login, limit);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userRouter.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userRouter.post('/users', validator.body(userSchema), async (req, res) => {
  try {
    const { body: user } = req;
    const response = await userService.create(user);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userRouter.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userService.softDelete(id);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userRouter.put('/users/:id', validator.body(userSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { body: user } = req;
    const response = await userService.update(id, user);
    res.send(`${response[0]} user(s) updated`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default userRouter;
