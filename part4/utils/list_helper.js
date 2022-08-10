const _ = require("lodash");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        const reducer = (max, item) => {
            return item.likes > max ? max = item.likes : max;
        }

        const maxLikes = blogs.reduce(reducer, blogs[0].likes)

        return blogs.find(b => b.likes === maxLikes)
    }
}

const mostBlogs = (blogs) => {

    const grouped = Object.entries(_.countBy(blogs, 'author')).sort((a, b) => { a[1] - b[1] })

    const last_author = grouped[grouped.length - 1]

    const prolific = {
        author: last_author[0],
        blogs: last_author[1]
    }

    return prolific

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}