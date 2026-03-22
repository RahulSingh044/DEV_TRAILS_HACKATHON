import express from 'express'
import { login, me, register } from '../controllers/auth.controller'
import protect from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/me',protect,me)

export default router