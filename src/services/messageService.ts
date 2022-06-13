import { connectionDataBase } from "../prisma"


export class MessageService {
    async execute(text:string,user_id:string){
        let message  = await connectionDataBase.message.create({
            data: {
                text,
                user_id
            },include:{
                user: true
            }
        })

        return message

    }
}