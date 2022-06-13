import express from 'express'
import { router } from './routes'
import 'dotenv/config'


const app = express()
app.use(express.json());
app.use(router)

app.get('/github',(req,res)=> {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback',(req,res)=> {
    let { code } = req.query

    return res.json(code)
})

app.listen(3333,()=> {
    console.log('server is running!!')
})