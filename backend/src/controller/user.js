import User from "../model/user.js";
import bcrypt from "bcrypt"
import { AlreadyExist, NotFound } from "../middleware/errors.js";
import { uploadImage } from "../utils/imageService.js";

const getAllUser= async(req,res, next)=>{
    try{
        const users= await User.findAll({attributes: { exclude: ['password'] }})
        res.status(200).send({"users":users})
    }catch(err){
        next(err)
    }
    
}

const getUser=async(req,res, next)=>{
    const {id}=req.params
    
    try{
        const user= await User.findByPk(id)
        if (!user) {
            throw new NotFound("User not found")
        }
        res.status(200).send({user:user})
    }catch(err){
        next(err)
    }
}

const createUser=async(req,res, next)=>{
    const {name,email,password,phone,role,rating}=req.body
    let image = req.files?.image || null

    try {
        const checkEmail=await User.findOne({
            where: {
              email:email, 
            }}) 

        if(checkEmail){
            throw new AlreadyExist("Email already exist")
        }

        if(image) {
            image = await uploadImage(image)
        }
            
        const passwordHash=bcrypt.hashSync(password,10)
    
        const user = await User.create({name,email,password:passwordHash,phone,role,rating,image });
        
        return res.status(201).send({message:"user created"})    
    } catch (error) {
       next(error)
    }
    
}

const updateUser=async(req,res, next)=>{
    const {id}=req.params

    try {
        
        const user=await User.findByPk(id) 

        if(!user){
            throw new NotFound("User not found")
        }
    
        user.set( {...req.body});
        user.save();
        return res.status(200).send({"message" :"user updated", "user": user})    
    } catch (error) {
        next()
    }
    

}

const deleteUser=async(req,res, next)=>{

    const {id}=req.params
    try {
        const user= await User.findByPk(id)
        
        if(!user){
            throw new NotFound("User not found")
        }
        const deletedUser = await User.destroy({
            where: { id: id }
          });
          
        return res.status(200).send({"message" :"user deleted"})
        } catch (error) {
            next(error)
    }
}



export{getUser,getAllUser,createUser,updateUser,deleteUser}