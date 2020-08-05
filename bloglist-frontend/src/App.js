import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/handleLogin'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notiMessage, setNotiMessage] = useState('')
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotiMessage(`username or password is incorrect.`)
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const newPost = {
      title: title,
      author: author,
      url: url
    }

    await blogService.create(newPost)

    setNotiMessage(`new blog post ${newPost.title }is created.`)
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }

  if (user === null) {
    return( 
    <>
    {notiMessage === '' ? <></> : <Notification message={notiMessage}/>}
      <Login 
    handleLogin={handleLogin} 
    username={username} 
    password={password} 
    setUsername={setUsername} 
    setPassword={setPassword} />
    </>
    )
  }

  return (
    <>
    {notiMessage === '' ? <></> : <Notification message={notiMessage}/>}
    <Blogs  
    user={user}
    title={title}
    author={author}
    url={url}
    setAuthor={setAuthor}
    setUrl={setUrl}
    setTitle={setTitle} 
    handleLogout={handleLogout} 
    handleCreate={handleCreate}
 />
  <div>
    {blogs.length === 0 
  ? `${user.username} has no blog post`
  : blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}
  </div>
  </>
  )
}

export default App