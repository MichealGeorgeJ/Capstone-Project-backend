import express from 'express'
import IssuedBooks from '../controller/issuedBooks.js'
const router=express.Router()


router.post('/create',IssuedBooks.addBook)
router.get('/',IssuedBooks.getAllBooks)
router.delete('/:id',IssuedBooks.deleteBookById)
router.get('/:libraryId/:isbn',IssuedBooks.getBookByLibraryIdAndIsbn)
router.patch('/:id',IssuedBooks.changeStatusAndDueDate)
router.get('/:id',IssuedBooks. getBookByIdOrLibraryId)



export default router