export default class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getById(id) {
    try {
      const record = await this.model.findByPk(id);
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  async get() {
    try {
      const records = await this.model.findAll();
      return records;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(record) {
    try {
      const response = await this.model.create(record);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const response = await this.model.destroy({
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, record) {
    try {
      const response = await this.model.update(record, {
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
