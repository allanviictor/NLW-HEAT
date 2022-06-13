import { connectionDataBase } from '../prisma'


export class GetLastMessages {
    async execute(){
        const messages = await connectionDataBase.message.findMany({
            take: 3,
            orderBy:{
                created_at: 'desc'
            },
            include:{
                user: true
            }
        })


        return messages
    }
}