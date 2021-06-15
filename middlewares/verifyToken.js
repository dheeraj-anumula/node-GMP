import jwt from 'jsonwebtoken';
import config from '../config';
import { INVALID_TOKEN, NO_TOKEN, AUTHORIZATION } from '../constants';

const verifyToken = (req, res, next) => {
  const token = req.headers[AUTHORIZATION].split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: NO_TOKEN });
  }

  try {
    jwt.verify(token, config.secret);
  } catch (error) {
    return res.status(403).send({ message: INVALID_TOKEN });
  }
  return next();
};

export default verifyToken;
