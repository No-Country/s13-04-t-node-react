import dotenv from "dotenv"
dotenv.config()

export const config={
    DB_USER:process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_HOST:process.env.DB_HOST,
    DB_ROUTE_SSL:process.env.DB_ROUTE_SSL
}