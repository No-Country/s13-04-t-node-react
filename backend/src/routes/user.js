import { Router } from "express";

const route=Router()



route.get("/",(req,res)=>{
    res.send("vienvenido a get")
})
route.get("/:id")
route.post("/:id")
route.patch("/:id")
route.delete("/:id")


export default route;
