const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// const mongoUrl = 'mongodb://localhost/bloglist'

logger.info('connecting to', config.MONGODB_URI)
console.log('connecting...')
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

// app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/testBlogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', middleware.tokenExtractor, loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app