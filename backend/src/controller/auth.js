import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {config} from "../config/config.js"
import { Unauthorized, AlreadyExist,NotFound } from "../middleware/errors.js";
import { uploadImage } from "../utils/imageService.js";

const login= async(req,res,next)=>{
 
const {email, password}=req.body

try {

    const user= await User.findOne({where:{email:email}})
    if(!user){
        throw new NotFound("User not found")
    }
    const passwordMatch =  bcrypt.compareSync(password, user.password);
    
    if (!passwordMatch) {
        throw new Unauthorized("Password incorrect")
    }

    const token = jwt.sign({ userId: user.id }, config.API_SECRET);

    user.password=undefined
        
    return res.status(200).json({ message: 'Inicio de sesión exitoso', token: token, user: user });

   } catch (err) {
        next(err)
   }
}

const register=async(req,res, next)=>{
    const {name,email,password, identity,phone,role}=req.body
    let image = req.files?.image || null
    try {
        const checkEmail=await User.findOne({
            where: {
              email:email
            }}) 
        
        if(checkEmail){
            throw new AlreadyExist("Email already exist")
        }

        const checkIdentity =await User.findOne({
            where: {identity: identity}
        })

        if(checkIdentity){
            throw new AlreadyExist("Identity already exist")
        }
        
        if(image) {
            image = await uploadImage(image)
        }

        const passwordHash=bcrypt.hashSync(password,10)

        req.body.password=passwordHash
    
        await User.create({name,email,password:passwordHash, identity,phone,role,image });
        
        return res.status(201).send({message:"user created"})    
    } catch (error) {
       next(error)
    }
    
}

export {login, register}