import axios from 'axios'
import { connectionDataBase } from "../prisma"
import { sign } from 'jsonwebtoken'


interface GithubTokenResponse {
    access_token: string,
	token_type: string,
	scope: string
}

interface GitHubUserInfos {
    id:number
    login:string
    avatar_url:string   
    name:string
}

export class authenticateService {
    async execute(code:string){

        const url:string = 'https://github.com/login/oauth/access_token'

        const { data } = await axios.post<GithubTokenResponse>(url,null,{
            params:{
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                Accept: 'application/json'
            }
        })


        const getGitHubUser = await axios.get<GitHubUserInfos>('https://api.github.com/user',{
            headers:{
                authorization: `bearer ${data.access_token}`
            }
        })


        const { name, login, id, avatar_url } = getGitHubUser.data

        let user = await connectionDataBase.user.findFirst({
            where: {
                github_id: id 
            }
        })

        if(!user){
            user = await connectionDataBase.user.create( {
                data: {
                    avatar_url,
                    github_id: id,
                    login,
                    name,
                }
            })

        }
        
        const token = sign(
            {
                user:{
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id:user.id,
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )
        



        return { token,user } 

    }
}