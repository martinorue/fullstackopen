const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const testHelper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.blogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\json/)
})

afterAll(() => {
    mongoose.connection.close()
})