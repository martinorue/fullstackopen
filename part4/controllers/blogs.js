const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const { title, author, url, likes } = request.body

    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {//with express-async-errors
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
    const { title, author, url, likes } = request.body

    const blog = {
        title: title,
        author: author,
        url: url,
        likes: likes,
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter