const blogs = require('./test_helper').blogs
const favoriteBlog = require('../utils/for_testing').favoriteBlog

describe('favorite blog', () => {

    test('of one value is the value itself', () => {
        const favorite = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
        }
        const result = favoriteBlog([blogs[0]])
        expect(result).toEqual(expect.objectContaining(favorite))
    })

    test('of emtpy array is {}', () => {
        const result = favoriteBlog([])
        expect(result).toEqual({})
    })

    test('of many is calculated right', () => {
        const result = favoriteBlog(blogs)

        const favorite = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(expect.objectContaining(favorite))
    })
})