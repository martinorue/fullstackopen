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

const mostBlogs = (blogs_arr) => {

    // const ret = { author: "Robert C. Martin", blogs: 3 }

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}