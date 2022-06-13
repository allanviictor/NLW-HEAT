import { GetProfileUserService } from '../services/getprofileuser'
import { Request,Response } from 'express'

export class GetProfileUserController {
    async handler(req:Request,res:Response){
        const { user_id } = req

        const service = new GetProfileUserService()

        const result = await service.execute(user_id)

        return res.json(result)
    }
}



