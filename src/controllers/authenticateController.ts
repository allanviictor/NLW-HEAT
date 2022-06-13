import { authenticateService } from '../services/authenticateService'
import { Request, Response } from 'express';


export class AuthenticateController {
    async handle(req:Request,res:Response){
        const { code } = req.body 
        const service = new authenticateService()


        try{
            const result = await service.execute(code)
            return res.json(result)
        }catch(err){
            return res.json({error:err})
        }

    }
}