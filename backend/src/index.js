import express from 'express'
import cors from 'cors'
import routerGeneral from "./routes/index.js"
import { sequelize } from "./config/db.js"
import { errorHandler } from './middleware/errors.js'

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

const port = process.env.PORT || 3000

const app = express()

//middleware
app.use(express.json())
app.use(cors(corsOptions))

//routes
app.get("/api/health-check", async (req, res) => {
    res.status(200).send("Stable");
});

app.use("/api",routerGeneral)

app.use(errorHandler)

//listengin
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})