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
  if (!visible) {
  return (
  <div style={blogStyle} className='blog'>
    <div>
      <b>{blog.title} {blog.author}</b>
      <button onClick={toggleVisibility} className="view">
      view
      </button>
    </div>
  </div> )
  } else {
    return (
    <div style={blogStyle} className='blog'>
    <div className="title">
    {blog.title} <button onClick={toggleVisibility}>hide</button>
    </div>
    <div className="url">
    {blog.url}
    </div>
    <div className="likes">
    likes {likes} <button onClick={() => likePost(blog.id, blog)}>like</button>
    </div>
    <div className="author"> 
    {blog.author}
    </div>
  <button onClick={deletePost}>delete</button>
  </div>
    )
  }
}

export default Blog
