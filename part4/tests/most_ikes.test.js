const blogs = require('./test_helper').blogs
const mostLikes = require('../utils/for_testing').mostLikes

describe('most likes', () => {
    test('', () => {
        const result = mostLikes(blogs)

        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})