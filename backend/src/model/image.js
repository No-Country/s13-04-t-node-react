import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

export const Image = sequelize.define('Image', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false
	},
	route: {
        type: DataTypes.STRING,
        allowNull: false,
	}
}, {
    timestamps: true,
})