import express from 'express';
import Joi from 'joi';
import ejValidator from 'express-joi-validation';

const userRouter = express.Router();
const validator = ejValidator.createValidator();

const bodySchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  isDeleted: Joi.bool().required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

let users = [
  {
    id: '1',
    login: 'user1',
    password: 'password12',
    age: 26,
    isDeleted: false,
  },
];

userRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;
  console.log(users);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.send(user);
  } else {
    res.send('User not found');
  }
});

userRouter.post('/user', validator.body(bodySchema), (req, res) => {
  const { body: user } = req;
  users = [...users, user];
  res.send('User added successfully');
});

userRouter.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  let userFound = false;
  const newUsers = users.map((user) => {
    if (user.id === id) {
      user.isDeleted = true;
      userFound = true;
      return user;
    }
    return user;
  });
  users = newUsers;
  if (userFound) {
    res.send('User deleted successfully');
  } else {
    res.send('User not found');
  }
});

userRouter.put('/users/:id', validator.body(bodySchema), (req, res) => {
  const { id } = req.params;
  const { body: updatedUser } = req;
  let userFound = false;
  const newUsers = users.map((user) => {
    if (user.id === id) {
      userFound = true;
      return {
        ...user,
        ...updatedUser,
      };
    }
    return user;
  });
  users = newUsers;
  if (userFound) {
    res.send('User updated successfully');
  } else {
    res.send('User not found');
  }
});

userRouter.get('/users/getAutoSuggestUsers/:limit', (req, res) => {
  const { limit } = req.params;
  const { login } = req.body;
  const filteredUsers = users
    .filter((user) => user.login.toUpperCase().includes(login.toUpperCase()))
    .sort((a, b) => {
      const loginA = a.login.toUpperCase();
      const loginB = b.login.toUpperCase();
      if (loginA < loginB) {
        return -1;
      }
      if (loginA > loginB) {
        return 1;
      }
      return 0;
    })
    .slice(0, limit);

  res.send(filteredUsers);
});

export default userRouter;
