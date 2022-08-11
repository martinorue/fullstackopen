const blogs = require('./test_helper').blogs
const mostBlogs = require('../utils/for_testing').mostBlogs

describe('most blogs', () => {

    test('of many is grouping right', () => {

        const result = mostBlogs(blogs)

        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})