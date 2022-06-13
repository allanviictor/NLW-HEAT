import { Request, response, Response } from 'express';
import { MessageService } from '../services/messageService'


export class MessageController {
    async handle(req:Request,res:Response){
        let { text } = req.body;
        let { user_id }  = req

        const service = new MessageService()
        const result = await service.execute(text,user_id)

        return res.json(result)

    }
}