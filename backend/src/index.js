import express from 'express'
import cors from 'cors'
import routerGeneral from "./routes/index.js"
import { sequelize } from "./config/db.js"
import './model/index.js'
import { errorHandler } from './middleware/errors.js'
import fileUpload from 'express-fileupload'
import { swaggerDocs } from './config/swagger.js'
import { createJsonApi, saveQueryBack } from "send-http-axios-doc";
import { initModels } from './model/initModels.js'
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

const port = process.env.PORT || 3000

const app = express()
initModels();

//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(fileUpload())
app.use("/api/test",express.static('send'));
//routes
app.get("/api/health-check", async (req, res) => {
    res.status(200).send("Stable");
});


app.use("/api",routerGeneral)
app.use("/saveQuery",saveQueryBack)
app.use(errorHandler)
// documentacion
//createJsonApi(app, port);


//listengin
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    swaggerDocs(app, port)
})