import dotenv from "dotenv"
dotenv.config()

export const config={
    DB_USER:process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_HOST:process.env.DB_HOST,
    DB_ROUTE_SSL:process.env.DB_ROUTE_SSL,
    CLOUD_NAME:process.env.CLOUD_NAME,
    API_KEY:process.env.API_KEY,
    API_SECRET:process.env.API_SECRET,
    TOKEN_MP:process.env.TOKEN_MP,
    USER:process.env.USER,
    PASS:process.env.PASS,
    URL_FRONT_EMAIL:process.env.URL_FRONT_EMAIL

}
