/* import { Router } from 'express' */
import express from 'express';
import { AuthenticateController } from './controllers/authenticateController'
import { MessageController } from './controllers/messageController'
import { EnsureAutheticate } from './middleware/ensureAuthenticate'

export const router = express.Router()

let authenticateController = new AuthenticateController()

router.post('/authenticate',(req,res) => authenticateController.handle(req,res) )

router.post('/messages',EnsureAutheticate,(req,res) =>new MessageController().handle(req,res))


