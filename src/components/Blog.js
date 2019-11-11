import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import blogsService from '../services/blogs'
import BlogCommentFrom from './BlogCommentForm'
import { Button } from 'react-bootstrap'

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
        id: 'noblogid',
        comments: []
    })

    useEffect(() => {
        updateBlogData()
        // TODO: implement thunk redux to remove this warning
        // eslint-disable-next-line
    }, [])

    const updateBlogData = () => {
        if (props.id) {
            blogsService.getBlog(props.id).then((response) => {
                setBlog(response)
                // console.log('blogsService gives response: ', response.comments)
            })
        }
    }

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
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes} likes <Button variant="primary" onClick={handleAddLike}>like</Button></p>
            <p>added by {blog.user.name}</p>
            <p>comments:</p>
            <ul>
                {blog.comments.map( (comment, id) => { return (
                    <li key={`comment${id}`}>
                        {comment}
                    </li>
                )})}
                <li ><BlogCommentFrom id={blog.id} updatePage={updateBlogData}/></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = {
    showNotification
}

export default connect(null,mapDispatchToProps)(Blog)

