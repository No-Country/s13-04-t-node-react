import express from 'express'
import cors from 'cors'
import { sequelize } from "./config/db.js"

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

app.get("/api/health-check", async (req, res) => {
    res.status(200).send("Stable");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})