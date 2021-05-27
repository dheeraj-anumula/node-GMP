import { Op } from 'sequelize';
import BaseService from './BaseService';

export default class UserService extends BaseService {
  constructor(userModel) {
    super(userModel);
    this.userModel = userModel;
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
        },
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
