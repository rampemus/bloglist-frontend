import React, { useEffect, useState } from 'react'
import usersService from '../services/users'

const User = (props) => {

    useEffect(() => {
        usersService.getUser(props.id).then(response => setUser(response))
        // TODO: implement thunk redux to remove this warning
        // eslint-disable-next-line
    }, [])

    const [user, setUser] = useState({
        blogs: [{
            likes: 0,
            title: '...',
            author: '...',
            url: '...',
            user: '...',
            __v: 0,
            id: '...'
        }],
        username: '...',
        name: '...',
        id: '...'
    })

    return(
        <div>
            <h1>{user.username}</h1>
            <p>{user.name}</p>
            <ul>
                {user.blogs.map((blog, id) => {
                    return (
                        <li key={`title${id}`}>{blog.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default User
