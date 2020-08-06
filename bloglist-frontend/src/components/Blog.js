import React from 'react'
const Blog = ({ blog, deletePost }) => (
  <div>
    <p>
    {blog.title} {blog.author} <button onClick={deletePost}>delete</button>
    </p>
  </div>
)

export default Blog
