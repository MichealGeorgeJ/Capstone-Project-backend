import express from 'express'
import magazines from '../controller/magazines.js'
const router=express.Router()

router.get('/',magazines.getAllMagazines)
router.post('/',magazines.addMagazines)
router.delete('/:id',magazines.deleteMagazineById)


export default router