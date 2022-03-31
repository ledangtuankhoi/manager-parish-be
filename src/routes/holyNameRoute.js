import { Router } from 'express'
const route = Router()
import { create, delete_all, detailOne } from '../app/controllers/holyNameController.js'
import verifyToken from '../app/middleware/auth.js'


// route.get('/',index)
route.get('/:id',detailOne)
route.post('/',create)
route.delete('/delete-all',delete_all) 

export default route 