import { Router } from "express";
import {searchGarage} from "../controller/searchGarage.js"
const route=Router()


route.get("/",searchGarage)



export default  route