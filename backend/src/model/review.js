import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import Garages from "./garage.js";
import User from './user.js';

export const Review = sequelize.define("Review", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_author : {
        type :DataTypes.UUID,
        field: 'id_author',
        allowNull: false,
        references: {
            key: 'id',
            model: User
        }
    },
    id_receiver : {
        type :DataTypes.UUID,
        field: 'id_receiver',
        allowNull: false,
        references: {
            key: 'id',
            model: Garages
        }
    },
    type: {
      type: DataTypes.ENUM('User', 'Garage'),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });
  
  Review.belongsTo(User, { foreignKey: "id_author", as: "author" });
  Review.belongsTo(Garages, { foreignKey: "id_receiver", as: "receiver" });