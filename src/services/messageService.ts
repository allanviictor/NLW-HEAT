import { connectionDataBase } from "../prisma"
import { socket } from '../app'

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
        
        const menssageInfos = {
            user_id: message.user_id,
            text: message.text,
            created_at: message.created_at,
            id: message.id,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        }

        socket.emit('new_message',menssageInfos)

        return message

    }
}