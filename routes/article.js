import express from 'express'
const router = express.Router()

import { article } from '../controllers/'

router.get('/', article.getAll)
router.get('/:id', article.get)
router.post('/', article.create)
router.put('/:id', article.update)
router.delete('/:id', article.delete)

export default router
