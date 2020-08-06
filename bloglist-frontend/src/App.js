import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/handleLogin'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notiMessage, setNotiMessage] = useState('')
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotiMessage(`username or password is incorrect.`)
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
      await blogService.remove(id)

      setNotiMessage(`post deleted.`)
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)

      blogService.getAll().then(blogs => setBlogs( blogs ))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (post) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(post)

    setNotiMessage(`new blog post ${post.title }is created.`)
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }

  if (user === null) {
    return( 
    <>
    <h1><b>Blogs</b></h1>
    {notiMessage === '' ? <></> : <Notification message={notiMessage}/>}
    <Togglable buttonLabel="login">
    <Login login={login} />
    </Togglable>
    </>
    )
  }

  return (
    <>
    {notiMessage === '' ? <></> : <Notification message={notiMessage}/>}
    <h2>blogs</h2>

    <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
    <Togglable buttonLabel={'new blog posts'} ref={blogFormRef}>
      <Blogs createBlog={createBlog} />
    </Togglable>
  <div>

    {blogs.length === 0 
  ? `${user.username} has no blog post`
  : blogs.map(blog =>
    <Blog key={blog.id} blog={blog} deletePost={() => handleDelete(blog.id)} />
  )}
  </div>
  </>
  )
}

export default App