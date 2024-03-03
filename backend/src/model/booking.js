import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import { Car } from "./car.js";
import Garages from "./garage.js";

export const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date_start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "active", "inactive"),
    allowNull: false,
    defaultValue: "pending",
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
});

Booking.belongsTo(Car, { foreignKey: "id_car", as: "car" });
Booking.belongsTo(Garages, { foreignKey: "id_garage", as: "garage" });
