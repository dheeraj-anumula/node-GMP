import { Op } from 'sequelize';

export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserById(id) {
    try {
      const user = await this.userModel.findByPk(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(user) {
    try {
      const response = await this.userModel.create(user);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id) {
    try {
      const response = await this.userModel.destroy({
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id, user) {
    try {
      const response = await this.userModel.update(user, {
        where: {
          id,
        },
      });
      return response;
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
}
