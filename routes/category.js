import express from 'express'
const router = express.Router()

import { category } from '../controllers/'

router.get('/', category.getAll)
router.get('/:id', category.get)
router.post('/', category.create)
router.put('/:id', category.update)
router.delete('/:id', category.delete)

export default router
