import express from 'express'
import { router } from './routes'
import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'



const app = express()
app.use(cors())
const serverHttp = http.createServer(app)
const socket = new Server(serverHttp,{
    cors:{
        origin: "*"
    }
})

socket.on('connection',socket=> {
    console.log(socket.id)
})

app.use(express.json());
app.use(router)

app.get('/github',(req,res)=> {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback',(req,res)=> {
    let { code } = req.query

    return res.json(code)
})

export { serverHttp,socket }