import React, { useState, useEffect } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, setNotification, updateBlogs }) => {

    const [expanded, setExpanded] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const [likes, setLikes] = useState(blog.likes)

    useEffect(()=>{
        setLikes(blog.likes)
    },[blog])

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

    //TODO: fix error handling messages to something more describing
    const handleAddLike = (event) => {
        event.preventDefault()

        blogsService.setLikes(blog.id, likes+1)
            .then(response=>{
                setLikes(likes+1)
                setNotification({ message: `You liked ${blog.title}`, error:false })
                updateBlogs()
            })
            .catch( error => {
                setNotification({ message: 'like could not be added', error:true })
            })
    }

    //TODO: fix error handling messages to something more describing
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
            <div onClick={toggleExpanded}>{blog.title} by {blog.author}</div>
            { expanded ? expandedContent() : '' }
        </div>
    }
}

export default Blog
