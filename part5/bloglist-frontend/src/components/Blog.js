import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const [likedBlog, setLikedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = {
    display: infoVisible ? '' : 'none'
  }

  const handleVisible = () => {
    setInfoVisible(!infoVisible)
  }

  const addLike = async (blog) => {

    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    }

    const res = await updateBlog(blogToUpdate)
    setLikedBlog(res)
  }

  const removeBlog = (blog) => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}<button onClick={() => handleVisible()}>{infoVisible ? 'hide' : 'view'}</button>
      </div >
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{likedBlog.likes}<button onClick={() => addLike(blog)}>like</button></div>
        <div>{blog.user.username}</div>
        {console.log(blog.user)}
        {
          user.username === blog.user.username ?
            <button onClick={() => removeBlog(blog)}>remove</button>
            : ''
        }
      </div>
    </div>
  )
}

export default Blog