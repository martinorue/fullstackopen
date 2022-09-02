import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('John Petrucci')
  const [password, setPassword] = useState('dreamtheater')
  const [message, setMessage] = useState(null)
  const [msjType, setMsjType] = useState()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      // setUsername('')
      // setPassword('')
    } catch (exception) {
      setMsjType('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blogObject) => {
    newBlogFormRef.current.toggleVisibility()
    try {
      const res = await blogService.create(blogObject)
      console.log(res)
      setBlogs(blogs.concat(res))
      setMsjType('ok')
      setMessage(`added ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMsjType('error')
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const newBlogFormRef = useRef()

  return (
    <div>
      <Notification message={message} msjType={msjType} />
      {user === null ?
        <div>
          <LoginForm username={username} password={password} handleSubmit={handleSubmit} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
            <NewBlogForm createBlog={addBlog} />
          </Togglable>
          <ul>
            {blogs.map(blog => <li key={blog.id}> <Blog blog={blog} /></li>)}
          </ul>
        </div>}
    </div>
  )
}

export default App
