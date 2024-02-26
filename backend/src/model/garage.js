import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import  User from './user.js';
import { Image } from './image.js';

const Garages = sequelize.define('Garages', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    idUser: {
        type: DataTypes.UUID,
        field: 'id_user',
        allowNull: false,
        references: {
            key: 'id',
            model: User
        }
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zipCode: {
        type: DataTypes.STRING,
        field: 'zip_code',
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    whitConfirmation : {
        type: DataTypes.BOOLEAN,
        field: 'whit_confirmation',
        defaultValue: false,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    coordinates: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type:DataTypes.FLOAT,
        defaultValue: null,
        allowNull: true
    },
    schedule: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('particular' , 'company'),
        defaultValue: 'particular',
        allowNull: false
    }
});

Garages.hasMany(Image, { foreignKey: 'garage_id', as: 'images' });
Garages.belongsTo(User, {foreignKey: 'id_user', as: 'user',});

export default Garages;