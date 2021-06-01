import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import config from '../config';
import BaseService from './BaseService';

export default class UserService extends BaseService {
  constructor(userModel) {
    super(userModel);
    this.userModel = userModel;
  }

  async login(login, password) {
    try {
      const user = await this.userModel.findOne({
        where: { login, password, isDeleted: false },
      });
      if (user) {
        const payload = { id: user.id, login: user.login };
        return jwt.sign(payload, config.secret, { expiresIn: 3600 });
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAutoSuggestUsers(login, limit) {
    try {
      let response;
      if (!login) {
        response = await this.userModel.findAll();
      } else {
        response = await this.userModel.findAll({
          where: {
            login: {
              [Op.iLike]: `%${login}%`,
            },
          },
          order: [['login', 'ASC']],
          limit,
        });
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async softDelete(id) {
    try {
      const response = await this.model.update(
        { isDeleted: true },
        {
          where: {
            id,
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
