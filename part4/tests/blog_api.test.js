const mongoose = require('mongoose')
const blogs = require('./test_helper').blogs
const testHelper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
}, 300000)

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/testBlogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('unique identifier property is named id', async () => {
        const response = await api.get('/api/testBlogs')
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })

    test('creating a new blog is successful', async () => {

        const blog = {
            title: 'newBlogTest',
            author: 'newBlogTest',
            url: 'newBlogTest',
            likes: 120
        }

        await api
            .post('/api/testBlogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await testHelper.blogsInDb()

        expect(response).toHaveLength(blogs.length + 1)

        const titles = response.map(b => b.title)
        expect(titles).toContain('newBlogTest')
    })

    test('missing like property it will default to cero', async () => {
        const blog = {
            title: 'testLikeDefaultCero',
            author: 'testLikeDefaultCero',
            url: 'testLikeDefaultCero',
        }

        const response = await api.post('/api/testBlogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes === 0)
    })

    test('!title and !url responds 400 Bad Request', async () => {
        const blog = {
            author: 'testTitle&Url',
            likes: 10
        }

        await api.post('/api/testBlogs')
            .send(blog)
            .expect(400)
    })

    test('deleting a blog with existing id responds 204', async () => {

        const existingBlog = blogs[0]

        await api
            .delete(`/api/testBlogs/${existingBlog._id}`)
            .expect(204)

        const response = await testHelper.blogsInDb()
        expect(response).toHaveLength(blogs.length - 1)

        const titles = response.map(b => b.title)
        expect(titles).not.toContain(blogs[0].title)
    })

    test('deleting a blog with non existing id responds 204', async () => {
        const nonExistingId = await testHelper.nonExistingId()

        await api
            .delete(`/api/testBlogs/${nonExistingId}`)
            .expect(204)
    })

    test('update the amount of likes for a blog post', async () => {

        const blogToUpdate = {
            id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 450,
        }

        const response = await api
            .put(`/api/testBlogs/${blogToUpdate.id}`)
            .send(blogToUpdate)

        expect(response.body).toEqual(expect.objectContaining(blogToUpdate))
    })
})

afterAll(() => {
    mongoose.connection.close()
})