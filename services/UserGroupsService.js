import BaseService from './BaseService';

export default class UserGroupsService extends BaseService {
  constructor(userGroupsModel) {
    super(userGroupsModel);
    this.userGroupModel = userGroupsModel;
  }

  async addUsersToGroup(groupId, userId) {
    return this.create({ groupId, userId });
  }
}
