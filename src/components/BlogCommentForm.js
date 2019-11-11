import React, { useState } from 'react'
import blogsService from '../services/blogs'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const BlogCommentForm = (props) => {

    const [comment, setComment] = useState('')

    const handleAddComment = ( event ) => {
        event.preventDefault()

        blogsService.addComment(props.id,comment)
            .then(() => {
                props.showNotification(`comment ${comment} added`,false)
                setComment('')
                props.updatePage()
            }).catch(error => {
                props.showNotification(error.response.data.error, true)
            })
    }

    return(
        <form onSubmit={handleAddComment}>
            <input type='text' value={comment} onChange={
                ({ target }) => setComment(target.value)
            } />
            <button type='submit'>add</button>
        </form>
    )
}

const mapDispatchToProps = {
    showNotification
}

export default connect(null,mapDispatchToProps)(BlogCommentForm)

