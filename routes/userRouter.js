import express from 'express';
import ejValidator from 'express-joi-validation';
import { userSchema } from '../validation/schema';
import { UserService } from '../services';
import { UserModel } from '../models';
import { logRequest, logError } from '../middlewares/logger';
import { INVALID_CREDENTIALS } from '../constants';
import verifyToken from '../middlewares/verifyToken';

const userRouter = express.Router();
const validator = ejValidator.createValidator();

const userService = new UserService(UserModel);

userRouter.post('/login', logRequest, async (req, res, next) => {
  try {
    const { password, login } = req.body;
    const token = await userService.login(login, password);
    if (!token) {
      return res.status(401).send({ message: INVALID_CREDENTIALS });
    }
    return res.send({ token });
  } catch (error) {
    logError(error, req, res, next);
    return res.status(error.status || 500).send(error.message);
  }
});

userRouter.get('/users', logRequest, verifyToken, async (req, res, next) => {
  try {
    const { limit, login } = req.query;
    const response = await userService.getAutoSuggestUsers(login, limit);
    res.send(response);
  } catch (error) {
    logError(error, req, res, next);
    res.status(error.status || 500).send(error.message);
  }
});

userRouter.get(
  '/users/:id',
  logRequest,
  verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      res.send(user);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

userRouter.post(
  '/users',
  logRequest,
  verifyToken,
  validator.body(userSchema),
  async (req, res, next) => {
    try {
      const { body: user } = req;

      const response = await userService.create(user);
      res.send(response);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

userRouter.delete(
  '/users/:id',
  logRequest,
  verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await userService.softDelete(id);
      res.send(response);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

userRouter.put(
  '/users/:id',
  logRequest,
  verifyToken,
  validator.body(userSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body: user } = req;
      const response = await userService.update(id, user);
      res.send(`${response[0]} user(s) updated`);
    } catch (error) {
      logError(error, req, res, next);
      res.status(error.status || 500).send(error.message);
    }
  }
);

export default userRouter;
