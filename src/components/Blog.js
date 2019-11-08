import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import LoginInfo from './LoginInfo'
import blogsService from '../services/blogs'

const Blog = (props) => {

    const [blog, setBlog] = useState({
        likes: 0,
        title: '...',
        author: '...',
        url: '...',
        user: {
            blogs: [],
            username: '...',
            name: '...',
            id: 'nouserid'
        },
        id: 'noblogid'
    })

    useEffect(() => {
        if (props.id) {
            blogsService.getBlog(props.id).then(response => setBlog(response))
        }
        
        // TODO: implement thunk redux to remove this warning
        // eslint-disable-next-line
    }, [])

    const handleAddLike = (event) => {
        event.preventDefault()

        blogsService.setLikes(blog.id, blog.likes + 1)
            .then(() => {
                const blogPlusOneLike = { ...blog, likes: blog.likes + 1 }
                setBlog(blogPlusOneLike)
                props.showNotification(`You liked ${blog.title}`, false)
            })
            .catch(() => {
                props.showNotification('like could not be added', true)
            })
    }

    return(
        <div>
            <h1>{blog.title}</h1>
            <LoginInfo />
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes} likes <button onClick={handleAddLike}>like</button></p>
            <p>added by</p>
        </div>
    )
}

const mapDispatchToProps = {
    showNotification
}

export default connect(null,mapDispatchToProps)(Blog)

