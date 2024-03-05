import User from "../model/user.js";
import { AlreadyExist, NotFound,Unauthorized } from "../middleware/errors.js";
import bcrypt from "bcrypt"
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
        const user= await User.findByPk(id,{attributes: { exclude: ['password'] }})
        if (!user) {
            throw new NotFound("User not found")
        }
        res.status(200).send({user:user})
    }catch(err){
        next(err)
    }
}


const updateUser=async(req,res, next)=>{
    const id=req.userId
    try {
        const user=await User.findByPk(id) 

        if(!user){
            throw new NotFound("User not found")
        }

        if(req.body.email){
            const userExist = await User.findOne({where: {email: req.body.email}})
            if(userExist){
                throw new AlreadyExist("Email already exist")
            }
        }
        user.set( {...req.body});
        user.save();
        user.password=undefined
        return res.status(200).send({"message" :"user updated", "user": user})    
    } catch (error) {
        next(error)
    }
}

const deleteUser=async(req,res, next)=>{

    const id=req.userId
    
    try {
        const user= await User.findByPk(id)
        
        if(!user){
            throw new NotFound("User not found")
        }

        await User.destroy({
            where: { id: id }
        });
          
        return res.status(200).send({"message" :"user deleted"})
        } catch (error) {
            next(error)
    }
}

const passwordChange=async(req,res)=>{
    const {password}=req.body
    const {newPassword}=req.body
    const id=req.userId
    try {
        const user=await User.findByPk(id)
  
    if (!user) {
        throw new NotFound("User not found")
    }
    const passwordCheker=bcrypt.compareSync(password,user.password)

    if (!passwordCheker) {
        throw new Unauthorized("User unauthorized")
    }

    
        user.password=bcrypt.hashSync(newPassword,10)
        user.save()
        return res.status(200).send("Password changed")

    } catch (err) {
        next(err)
    }
    
    }





export{getUser,getAllUser,updateUser,deleteUser,passwordChange}