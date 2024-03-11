import express from 'express'
import BookController from '../controller/books.js'
const router=express.Router()

router.get('/',BookController.getAllBooks)
router.get('/:idOrIsbn',BookController.getBookByIdOrIsbn)
router.post('/',BookController.addBook)
router.put('/:id',BookController.editBookById)
router.delete('/:id',BookController.deleteBookById)
router.patch('/:id',BookController.changeStatusAndDueDate)
// router.get('/:isbn',BookController.getBookByIsbn)


export default router