import express from 'express'
const router = express.Router()

import { comment } from '../controllers/'

router.get('/', comment.getAll)
router.get('/:id', comment.get)
router.post('/', comment.create)
router.put('/:id', comment.update)
router.delete('/:id', comment.delete)

export default router
