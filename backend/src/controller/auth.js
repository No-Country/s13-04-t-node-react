import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {config} from "../config/config.js"
import { Unauthorized, AlreadyExist } from "../middleware/errors.js";

const login= async(req,res,next)=>{
 
const {email, password}=req.body

try {

    const user= await User.findOne({where:{email:email}})
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        throw new Unauthorized("Password incorrect")
    }

    const token = jwt.sign({ userId: user.id }, config.API_SECRET, { expiresIn: '1h' });

        
    return res.status(200).json({ message: 'Inicio de sesión exitoso', token: token, user: user });

   } catch (err) {
        next(err)
   }
}

const register=async(req,res, next)=>{
    const {name,email,password,phone,role,rating,image}=req.body

    try {
        
        const checkEmail=await User.findOne({
            where: {
              email:email, 
            }}) 

            if(checkEmail){
                throw new AlreadyExist("Email already exist")
            }
            
        const passwordHash=bcrypt.hashSync(password,10)
    
        const user = await User.create({name,email,password:passwordHash,phone,role,rating,image });
        
        return res.status(201).send({message:"user created"})    
    } catch (error) {
       next(error)
    }
    
}

export {login, register}