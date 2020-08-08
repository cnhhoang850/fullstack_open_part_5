import React , {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deletePost }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const likePost = async  (id, blog) => {
    blog.likes += 1
    console.log(id)
    await blogService.update(id.toString(), blog)
    let newLikes = blog.likes 
    setLikes(newLikes)
  }

  const toggleVisibility = () => {
    return setVisible(!visible)
  }
  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      <b>{blog.title} {blog.author}</b>
      <button onClick={toggleVisibility}>
      view
      </button>
    </div>
    <div style={showWhenVisible}>
        <div>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
        {blog.url}
        </div>
        <div>
        likes {likes} <button onClick={() => likePost(blog.id, blog)}>like</button>
        </div>
        <div>
        {blog.author}
        </div>
      <button onClick={deletePost}>delete</button>
    </div>
  </div>
  )
}

export default Blog
