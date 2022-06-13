import { connectionDataBase } from '../prisma'


export class GetProfileUserService {
    async execute(user_id){
        const user = await connectionDataBase.user.findFirst({
            where: {
                id: user_id
            }
        })

        return user
    }
}