const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    if (!title && !url) {
        response.status(400).end()
    }

    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes ? likes : 0
    })

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
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