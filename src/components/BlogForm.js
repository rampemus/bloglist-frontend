import React, { useState } from 'react'
import blogsService from '../services/blogs'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { Form, Row, Button } from 'react-bootstrap'

const BlogForm = (props) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = (event) => {
        event.preventDefault()

        blogsService.createBlog(title, author, url)
            .then( () => {
                props.showNotification(`a new blog ${title} by ${author} added`,false)
                setTitle('')
                setAuthor('')
                setUrl('')
                props.updateBlogs()
            })
            .catch( error => {
                props.showNotification(error.response.data.error,true)
            })
    }

    return <form onSubmit={handleCreateBlog}>
        <Form.Group>
            <Form.Label>title</Form.Label> <input
                type='text'
                value={title}
                onChange={
                    ({ target }) => setTitle(target.value)
                }
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>author</Form.Label> <input
                type='text'
                value={author}
                onChange={
                    ({ target }) => setAuthor(target.value)
                }
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>url</Form.Label> <input
                type='text'
                value={url}
                onChange={
                    ({ target }) => setUrl(target.value)
                }
            />
        </Form.Group>
        <Button variant="primary"  type='submit'>create</Button>
    </form>
}

const mapDispatchToProps = {
    showNotification
}

export default connect(null,mapDispatchToProps)(BlogForm)
