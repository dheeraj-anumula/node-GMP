import { Sequelize, DataTypes } from 'sequelize';
import { USERS } from '../constants/tables';
import { sequelize } from '../loaders/sequelize';

const User = sequelize.define(
  USERS,
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { min: 4, max: 130 },
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default User;
