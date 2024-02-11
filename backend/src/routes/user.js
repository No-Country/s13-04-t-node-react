import { Router } from "express";
import {getUser,getAllUser,createUser,updateUser,deleteUser} from "../controller/user.js"
const route=Router()



route.get("/",getAllUser)
route.get("/:id",getUser)
route.post("/",createUser)
route.patch("/:id",updateUser)
route.delete("/:id",deleteUser)


export default route;
