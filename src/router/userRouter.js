import express from 'express'
import users from '../controller/users.js'

const router=express.Router()

router.post('/createUser',users.createUser)

router.post('/login',users.loginUser)
router.get('/',users.getAllUser)
router.delete('/:id',users.deleteUserById)
router.get('/:idOrEmailOrLibraryId',users.getUserByIdOrEmailOrLibraryId)
router.put('/:id',users.editUserById)
router.post('/add-mybook/:userId/:bookId',users.addMyBooks)
router.patch('/:userId/myBooks/:bookId',users.removeMyBooks)


export default router