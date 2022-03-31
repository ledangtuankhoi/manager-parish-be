import { Router } from 'express'
const route = Router()
import { deleteAll, test_verify_token, updateRefreshAccessTokenForClient } from '../app/controllers/authController.js'
import verifyToken from '../app/middleware/auth.js'

route.delete('/delete-all',deleteAll)
route.get('/test-token',verifyToken,test_verify_token)
route.post('/token',updateRefreshAccessTokenForClient)

export default route