import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cors())

server.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content,Accept, Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next()
})
server.get('/', (_req, res) => {
    res.status(200).json({
        message: 'server is working !',
    })
})
import { articleRoutes, commentRoutes, categoryRoutes, userRoutes } from './routes'
server.use('/article', articleRoutes)
server.use('/comment', commentRoutes)
server.use('/category', categoryRoutes)
server.use('/user', userRoutes)
server.listen(process.env.SERVER_PORT)

export default server
