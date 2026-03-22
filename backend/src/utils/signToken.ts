import jwt from 'jsonwebtoken'

const signToken = (userId: string) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET!,{
        expiresIn:"180d",
    })
    return token
}

export default signToken