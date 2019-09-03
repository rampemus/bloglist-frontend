import React, { useState } from 'react'
import blogsService from '../services/blogs'

const BlogForm = ({ updateBlogs, setNotification }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = (event) => {
        event.preventDefault()

        const user = JSON.parse(window.localStorage.getItem('loggedBlogsUser'))

        blogsService.createBlog(title, author, url, user.token)
            .then( ()=>{
                updateBlogs()
                setTitle('')
                setAuthor('')
                setUrl('')
                setNotification({ message: 'new blog created', error:false })
            })
            .catch( error => {
                setNotification({ message: error.response.data.error, error:true })
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

export default BlogForm
