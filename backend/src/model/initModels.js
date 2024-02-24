import Garages from "./garage.js"
import User from "./user.js"
import FavoriteGarages from "./favorite_garage.js"


export const initModels = () => {

    // Garages.hasMany(FavoriteGarages)
    // FavoriteGarages.belongsTo(Garages)
    // User.hasMany(FavoriteGarages)
    // FavoriteGarages.belongsTo(User)

    FavoriteGarages.belongsTo(Garages, { foreignKey: 'idGarage', as: 'garage' }); // Use 'garage' as alias
    Garages.hasMany(FavoriteGarages, { foreignKey: 'idGarage'}); // Optional: define alias for reverse

    User.hasMany(FavoriteGarages, { foreignKey: 'idUser' });
    FavoriteGarages.belongsTo(User, { foreignKey: 'idUser', as: 'user' });
}

