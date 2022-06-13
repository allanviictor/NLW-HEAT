import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Ipayload {
    sub:string 
}

export function EnsureAutheticate(req:Request,res:Response,next:NextFunction){
    const authToken = req.headers.authorization

    if(!authToken){
        return res.status(401).json({
            errorCode: "token.invalid"
        })
    }

    const [,token] = authToken.split(" ")

    try {
        const { sub } = <Ipayload> verify(token,process.env.JWT_SECRET)
        req.user_id = sub
        return next()
    }catch(error){
        return res.status(401).json({
            errorCode: "token.expired"
        })
    }
}