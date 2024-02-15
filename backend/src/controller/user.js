import User from "../model/user.js";
import bcrypt from "bcrypt"
import { AlreadyExist, NotFound } from "../middleware/errors.js";

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


const updateUser=async(req,res, next)=>{
    const {id}=req.params
    const {name,email,phone,role,rating,image}=req.body

    try {
        
        const checkUser=await User.findByPk(id) 

            if(!checkUser){
                throw new NotFound("User not found")
            }
            
    
        const user = await User.update({name,email,phone,role,rating,image },{where:{id:id}});
        
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



export{getUser,getAllUser,updateUser,deleteUser}