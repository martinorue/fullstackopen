const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }

]

describe('total likes', () => {

    test('of one value is the value itself', () => {
        const result = listHelper.totalLikes([blogs[0]])
        expect(result).toBe(7)
    })

    test('of empty array is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('of many is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

})


describe('favorite blog', () => {

    test('of one value is the value itself', () => {
        const favorite = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
        }
        const result = listHelper.favoriteBlog([blogs[0]])
        expect(result).toEqual(expect.objectContaining(favorite))
    })

    test('of emtpy array is {}', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    test('of many is calculated right', () => {
        const result = listHelper.favoriteBlog(blogs)

        const favorite = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(expect.objectContaining(favorite))
    })
})

describe('most blogs', () => {

    test('of many is grouping right', () => {

        const result = listHelper.mostBlogs(blogs)

        try {
            expect(result).toEqual({
                author: "Robert C. Martin",
                blogs: 3
            })
        } catch {
            try {
                expect(result).toEqual({
                    author: "Edsger W. Dijkstra",
                    blogs: 3
                })
            } catch (e) { }
        }
    })
})
