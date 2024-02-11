import User from "../model/user.js";
import bcrypt from "bcrypt"

const getAllUser= async(req,res)=>{
    try{
        const users= await User.findAll({attributes: { exclude: ['password'] }})
        if (!users) {
           return res.status(404).send({message:"User not found"})
        }
        res.status(200).send(users)
    }catch(err){
        res.status(404).send("A problem occurred when searching for users")
        console.log("error when searching for users");
    }
    
}

const getUser=async(req,res)=>{
    const {id}=req.params
    
    try{
        const user= await User.findByPk(id)
        if (!user) {
            return res.status(404).send("Users not found")
        }
        res.status(200).send({user:user})
    }catch(err){
        res.status(404).send("A problem occurred when searching for users")
        console.log("error when searching for users");
    }
}

const createUser=async(req,res)=>{
    const {id,name,email,password,phone,role,rating,image}=req.body

    try {
        
        const checkEmail=await User.findOne({
            where: {
              email:email, 
            }}) 

            if(checkEmail){
                return res.status(409).send({message:"Email not found"})
            }
            
        const passwordHash=bcrypt.hashSync(password,10)
    
        const user = await User.create({id,name,email,password:passwordHash,phone,role,rating,image });
        
        return res.status(200).send({message:"user create"})    
    } catch (error) {
         console.log(error);
       return res.status(500).send({message:"error creating user"})
    }
    
}

const updateUser=async(req,res)=>{
    const {id}=req.params
    const {name,email,phone,role,rating,image}=req.body

    try {
        
        const checkUser=await User.findByPk(id) 

            if(!checkUser){
                return res.status(409).send({message:"Users not found"})
            }
            
    
        const user = await User.update({name,email,phone,role,rating,image },{where:{id:id}});
        
        return res.status(200).send("user update")    
    } catch (error) {
         console.log(error);
       return res.status(500).send({message:"error updating user"})
    }
    

}

const deleteUser=async(req,res)=>{

    const {id}=req.params
    try {
        const user= await User.findByPk(id)
        
        if(!user){
            return res.status(404).send({message:"Users not found"})
        }
        if(user.id==id){
        const deletedUser = await User.destroy({
            where: { id: id }
          });
          
          return res.status(200).send("user delete")
        }
        return res.status(409).send("that is not your user, you cannot delete it")
        } catch (error) {
        console.log(error);
        return res.status(500).send("error deleting user")
    }
}



export{getUser,getAllUser,createUser,updateUser,deleteUser}