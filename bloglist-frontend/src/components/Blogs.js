import React from 'react'

const Blogs = ({user, title, author, url, setAuthor, setTitle, setUrl, handleLogout, handleCreate}) => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      <form onSubmit = {handleCreate}>
        <div>
            title: 
            <input
            type = "text"
            value = {title}
            name = "Title"
            onChange = {({target}) => {setTitle(target.value)}}
            />
        </div>
        <div>
            author: 
            <input
            type = "text"
            value = {author}
            name = "Author"
            onChange = {({target}) => {setAuthor(target.value)}}
            />
        </div>
        <div>
            url: 
            <input
            type = "text"
            value = {url}
            name = "Url"
            onChange = {({target}) => {setUrl(target.value)}}
            />
        </div>
        <button type = "submit">create</button>
      </form>
      
    </div>
)

export default Blogs