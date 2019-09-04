import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, setNotification }) => {

    const [expanded, setExpanded] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const [likes, setLikes] = useState(blog.likes)

    const style = {
        borderStyle: 'solid',
        borderRadius: '5px',
        borderColor: expanded ? 'black' : 'lightgrey',
        margin: '4px',
        padding: '4px'
    }

    const toggleExpanded = () => {
        console.log(blog)
        setExpanded(!expanded)
    }

    const handleAddLike = (event) => {
        event.preventDefault()

        blogsService.setLikes(blog.id, likes+1)
            .then(response=>{
                setLikes(likes+1)
            })
            .catch( error => {
                setNotification({ message: 'like could not be added', error:true })
            })
    }

    const handleDelete = (event) => {
        event.preventDefault()

        blogsService.deleteBlog(blog.id)
            .then(response => {
                setDeleted(true)
            })
            .catch( error => {
                setNotification({ message: 'like could not be deleted', error:true })
            })
    }

    const expandedContent = () => {
        return <div>
            <p>
                <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
                {likes} likes <button onClick={handleAddLike}>like</button>
            </p>
            <p>
                Added by {blog.user.name}
            </p>
            <button style={{backgroundColor:'pink'}} onClick={handleDelete}>delete</button>
        </div>
    }

    if (deleted) {
        return <div></div>
    } else {
        return <div style={style}>
            <div onClick={toggleExpanded}>{blog.title} {blog.author}</div>
            { expanded ? expandedContent() : '' }
        </div>
    }
}

export default Blog
