import express  from "express"
import homePage from "../controller/homePage.js"
import UserRoutes from './userRouter.js'
import BookRoutes from './booksRouter.js'
import MagazinesRoutes from './magazinesRouter.js'
import IssuedBooks from './issuedBooks.js'
const router=express.Router()

router.get('/',homePage.homePage)

router.use('/users',UserRoutes)
router.use('/books',BookRoutes)
router.use('/magazines',MagazinesRoutes)
router.use('/issuedbooks',IssuedBooks)

export default router
