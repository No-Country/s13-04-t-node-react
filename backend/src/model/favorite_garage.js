import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import  User from './user.js';
import Garages from './garage.js'


const FavoriteGarages = sequelize.define('Favorite_garages', {
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
    idGarage: {
        type: DataTypes.UUID,
        field: 'id_garage',
        allowNull: false,
        references: {
            key: 'id',
            model: Garages
        }
    }
})

export default FavoriteGarages;