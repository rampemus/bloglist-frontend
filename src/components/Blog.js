import React, { useState } from 'react'
const Blog = ({ blog }) => {

    const [expanded, setExpanded] = useState(false)

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

    const expandedContent = () => {
        return <div>
            <p>
                <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
                {blog.likes} likes <button>like</button>
            </p>
            <p>
                Added by {blog.user.name}
            </p>
        </div>
    }

    return <div style={style}>
        <div onClick={toggleExpanded}>{blog.title} {blog.author}</div>
        { expanded ? expandedContent() : '' }
    </div>
}

export default Blog
