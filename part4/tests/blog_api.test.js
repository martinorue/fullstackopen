const mongoose = require('mongoose')
const testHelper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    console.log('deleting...')
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.blogs)
}, 300000)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})