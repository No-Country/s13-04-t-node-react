import jwt from "jsonwebtoken"
import {config} from "../config/config.js"
import { Unauthorized } from "../middleware/errors.js";

const sessionAuth=async(req,res, next)=>{

 const token=req.headers.authorization 
 try {
   
    if (!token) {
        throw new Unauthorized("User not authorized")
    }
    const decode= jwt.verify(token.split(" ")[1],config.API_SECRET);
    req.userId=decode.userId
    next()
 } catch (err) {
    console.log(err);
    next(err)
 }
    
}



export {sessionAuth}