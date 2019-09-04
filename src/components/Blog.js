import React, { useState, useEffect } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, ownedByUser, setNotification, updateBlogs }) => {

    const [expanded, setExpanded] = useState(false)

    const [likes, setLikes] = useState(blog.likes)

    useEffect( () => {
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
        setExpanded(!expanded)
    }

    //TODO: fix error handling messages to something more describing
    const handleAddLike = (event) => {
        event.preventDefault()

        blogsService.setLikes(blog.id, likes+1)
            .then( () => {
                setLikes(likes+1)
                setNotification({ message: `You liked ${blog.title}`, error:false })
                updateBlogs()
            })
            .catch( () => {
                setNotification({ message: 'like could not be added', error:true })
            })
    }

    //TODO: fix error handling messages to something more describing
    const handleDelete = (event) => {
        event.preventDefault()

        if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {
            blogsService.deleteBlog(blog.id)
                .then( () => {
                    updateBlogs()
                })
                .catch( error => {
                    setNotification({ message: error.response.data.error, error:true })
                })
        }
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
            <button style={{
                backgroundColor:'pink',
                display: ownedByUser ? '' : 'none',
            }} onClick={handleDelete}>delete</button>
        </div>
    }


    return <div style={style}>
        <div onClick={toggleExpanded}>{blog.title} by {blog.author}</div>
        { expanded ? expandedContent() : '' }
    </div>
}

export default Blog
