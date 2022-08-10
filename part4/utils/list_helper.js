const _ = require("lodash");

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

    const grouped = Object.entries(_.countBy(blogs, 'author')).sort((a, b) => a[1] - b[1])

    const last_author = grouped[grouped.length - 1]

    const prolific = {
        author: last_author[0],
        blogs: last_author[1]
    }

    return prolific
}

const mostLikes = (blogs) => {//vanilla

    const groupBy = (objectArray, property) => {
        return objectArray.reduce((acc, item) => {
            const key = item[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item.likes);
            return acc;
        }, {});
    }

    const grouped = groupBy(blogs, 'author');

    const arr_ret = []
    for (const a in grouped) {
        arr_ret.push({
            author: a,
            likes: grouped[a].reduce((acc, item) => acc + item)
        })
    }

    const reducer = (max, item) => {
        return item.likes > max ? max = item.likes : max;
    }
    const maxLikes = arr_ret.reduce(reducer, arr_ret[0].likes)
    const ret = arr_ret.find(author => author.likes === maxLikes)

    return ret
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}