import { GetLastMessages } from "../services/getlastmessages";
import { Request,Response } from 'express'



export class GetLastMessageController {
    async handler(req:Request,res:Response){
        const service = new GetLastMessages()

        const reponse = await service.execute()


        return res.json(reponse)
    }

}