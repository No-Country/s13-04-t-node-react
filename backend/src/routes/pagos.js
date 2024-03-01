import { Router } from "express";
import {pago} from "../controller/mercadoPago.js"
const route=Router()



route.post("/",pago)


export default route