import { Sequelize } from "sequelize"
import { config } from "./config.js"

export const sequelize = new Sequelize('parking',config.DB_USER, config.DB_PASSWORD,{
    host: config.DB_HOST ,
    dialect: 'mysql',
    dialectOptions: {
    ssl: {
        ca: config.DB_ROUTE_SSL,
        rejectUnauthorized: false,
    }
}
});

try {
    await sequelize.authenticate();
    console.log('Connection has been establish successfully');
} catch (error) {
    console.log('Unable to connect to database:', error);
}