const mongoose = require('mongoose')
const testHelper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.blogs)
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

afterAll(() => {
    mongoose.connection.close()
})