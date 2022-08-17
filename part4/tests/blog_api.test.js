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
    expect(response)
})

afterAll(() => {
    mongoose.connection.close()
})