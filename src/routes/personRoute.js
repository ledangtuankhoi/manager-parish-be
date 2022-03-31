import { Router } from 'express'
const route = Router()
import { index, searchExact, searchQuick, detailOne, createOne, updateOne, delete_all, deleteOne,deleteMultiple } from '../app/controllers/personController.js'
import verifyToken from '../app/middleware/auth.js'


route.get('/',index) 
route.get('/search-exact',searchExact)  // tìm kiếm chính xác func test
route.get('/search-quick',searchQuick) 
route.get('/:id',detailOne) 
route.post('/',createOne) 
route.put('/:id',updateOne) 
route.delete('/delete-all',delete_all) 
route.delete('/delete-multiple',deleteMultiple)  
route.delete('/:id',deleteOne) 

export default route 