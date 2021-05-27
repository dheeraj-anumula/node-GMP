import { Sequelize, DataTypes } from 'sequelize';
import { PERMISSIONS } from '../constants';
import { GROUPS } from '../constants/tables';
import { sequelize } from '../loaders/sequelize';

const Group = sequelize.define(
  GROUPS,
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM({
          values: PERMISSIONS,
        }),
      ),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Group;
