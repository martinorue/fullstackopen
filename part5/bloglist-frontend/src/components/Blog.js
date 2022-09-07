import { useState } from "react"

const Blog = ({ blog }) => {

  const [infoVisible, setInfoVisible] = useState(false)

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}<button onClick={() => handleVisible()}>{infoVisible ? 'hide' : 'view'}</button>
      </div >
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes}<button>like</button></div>
        <div>{blog.user.username}</div>
      </div>
    </div>
  )
}

export default Blog