const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const testHelper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'martinorue',
            name: 'Martin Orue',
            password: 'cremapastelera',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('when there is initially some users saved', () => {
    test('username is not unique', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Matti Luukkainen',
            password: 'IdontKnow'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username is missed', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password is missed', async () => {
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDb()
        const usersAtStart = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('invalid username', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('invalid password', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 's'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})



afterAll(() => {
    mongoose.connection.close()
})
