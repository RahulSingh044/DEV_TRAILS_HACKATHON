import { Request, Response } from "express";
import { loginService, meService, registerService } from "../services/auth.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const register = async (req:Request, res: Response) => {
    try{
        const userData = req.body
        const token = await registerService(userData)
        return res.status(201).json({
            message:"registered successfully",
            token: token
        })
    }catch(err: any){
        console.log(err.message)
        if(err.message === "user already exists"){
            return res.status(409).json({error:err.message})
        }
        return res.status(500).json({error: "cannot register: internal server error"})
    }
}

export const login = async (req:Request, res:Response) => {
    try{
        const userData = req.body
        const token = await loginService(userData)
        return res.status(200).json({
            message:"login successful",
            token: token
        })
    }catch(err: any){
        console.log(err.message)
        if(err.message == "invalid username or password"){
            return res.status(401).json({error:err.message})
        }
        return res.status(500).json({error:"cannot login: internal server error"});
    }
}

export const me = async (req:AuthRequest, res:Response) => {
    try{
        const userId = req.user?.userId
        if(!userId){
            return res.status(401).json({error:"Unauthorized"})
        }
        const userData = await meService(userId)
        return res.status(200).json({
            message:"user data fecthed successfully",
            user: userData,
        })
    }catch(err:any){
        console.log(err.message)
    }
}