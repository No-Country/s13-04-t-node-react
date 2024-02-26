import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
 
const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identity: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('parking', 'user'), 
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: null,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });

  
  
export default User ;
