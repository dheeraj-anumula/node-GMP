import { Sequelize, DataTypes } from 'sequelize';
import { USER_GROUPS } from '../constants/tables';
import { sequelize } from '../loaders/sequelize';
import Group from './GroupModel';
import User from './UserModel';

const UserGroups = sequelize.define(
  USER_GROUPS,
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.UUID,
      references: {
        model: Group,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  },
);
User.belongsToMany(Group, { through: UserGroups, uniqueKey: 'id' });
Group.belongsToMany(User, { through: UserGroups, uniqueKey: 'id' });

export default UserGroups;
