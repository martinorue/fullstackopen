const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is initially users in db', () => {
    test('login with valid user', async () => {
        const user = {
            username: "martinorue",
            password: "cremapastelera"
        }

        await api
            .post('/api/login')
            .send(user)
            .expect(200)
    })
})

afterAll(() => {
    mongoose.connection.close()
})