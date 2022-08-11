const totalLikes = require('../utils/for_testing').totalLikes
const blogs = require('./test_helper').blogs

describe('total likes', () => {

    test('of one value is the value itself', () => {
        const result = totalLikes([blogs[0]])
        expect(result).toBe(7)
    })

    test('of empty array is zero', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })

    test('of many is calculated right', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })

})