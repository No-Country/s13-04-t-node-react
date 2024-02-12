import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import User from './user.js';
 
export const Car = sequelize.define('Car', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    timestamps: true,
});


Car.belongsTo(User, { foreignKey: 'user_id', as: 'user', })