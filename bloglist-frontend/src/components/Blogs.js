import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })
        
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
    <div >
      <h2>create new</h2>
      <form onSubmit = {handleCreate} className="formDiv">
        <div>
            title: 
            <input
            className="title"
            type = "text"
            value = {title}
            name = "Title"
            onChange = {({target}) => {setTitle(target.value)}}
            />
        </div>
        <div>
            author: 
            <input
            className="author"
            type = "text"
            value = {author}
            name = "Author"
            onChange = {({target}) => {setAuthor(target.value)}}
            />
        </div>
        <div>
            url: 
            <input
            className="url"
            type = "text"
            value = {url}
            name = "Url"
            onChange = {({target}) => {setUrl(target.value)}}
            />
        </div>
        <button type = "submit" id="create-button">create</button>
      </form>
      
    </div>
)}

export default BlogForm