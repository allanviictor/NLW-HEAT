/* import { Router } from 'express' */
import express from 'express';
import { AuthenticateController } from './controllers/authenticateController'
import { GetLastMessageController } from './controllers/getlastmessageController';
import { GetProfileUserController } from './controllers/getprofileusercontroller';
import { MessageController } from './controllers/messageController'
import { EnsureAutheticate } from './middleware/ensureAuthenticate'

export const router = express.Router()

let authenticateController = new AuthenticateController()

router.post('/authenticate',(req,res) => authenticateController.handle(req,res) )

router.post('/messages',EnsureAutheticate,(req,res) =>new MessageController().handle(req,res))

router.get('/last/messages',(req,res)=> new GetLastMessageController().handler(req,res))

router.get('/user/profile',EnsureAutheticate,(req,res)=> new GetProfileUserController().handler(req,res))


