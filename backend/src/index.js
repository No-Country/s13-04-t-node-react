import express from 'express'
import cors from 'cors'
import routerGeneral from "./routes/index.js"

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

//routes
app.use("/api",routerGeneral)


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})