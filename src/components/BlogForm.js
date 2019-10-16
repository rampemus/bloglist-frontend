import React, { useState } from 'react'
import blogsService from '../services/blogs'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

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
        <div>
            title <input
                type='text'
                value={title}
                onChange={
                    ({ target }) => setTitle(target.value)
                }
            />
        </div>
        <div>
            author <input
                type='text'
                value={author}
                onChange={
                    ({ target }) => setAuthor(target.value)
                }
            />
        </div>
        <div>
            url <input
                type='text'
                value={url}
                onChange={
                    ({ target }) => setUrl(target.value)
                }
            />
        </div>
        <button type='submit'>create</button>
    </form>
}

const mapDispatchToProps = {
    showNotification
}

export default connect(null,mapDispatchToProps)(BlogForm)
