import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../configs/db.config";
import bcrypt from 'bcrypt'
import signToken from "../utils/signToken";

export const registerService = async (userData:{
    email: string,
    password: string,
    name: string,
    phone_number: string,
    avg_daily_income: Decimal
    platforms: string[]
    city: string
    upi_id: string
}) => {
    const {password, ...data} = userData
    const user = await prisma.user.findUnique({
        where:{email: data.email},
    })

    if(user){
        throw new Error("user already exists");
    }

    const pass_hash = await bcrypt.hash(password,10)
    const newUser = await prisma.user.create({
        data:{
            pass_hash,
            ...data           
        }
    })
    const token = signToken(newUser.id);
    return token
}


export const loginService = async (userData:{
    email: string,
    password: string
}) => {
    const user = await prisma.user.findUnique({
        where:{email:userData.email}
    })
    if(!user){
        throw new Error("invalid username or password")
    }
    const isValidPass = await bcrypt.compare(userData.password,user.pass_hash)
    if(!isValidPass){
        throw new Error("invalid username or password")
    }
    const token = signToken(user.id)
    return token
}

export const meService = async (id: string | undefined) => {
    if(id===undefined){
        throw new Error("id is undefined")
    }
    const user = await prisma.user.findUnique({where:{id}});

    if(!user){
        throw new Error("user not found")
    }
    const {pass_hash, ...data} = user
    return data
}