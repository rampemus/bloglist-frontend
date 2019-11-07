import React, { useEffect, useState } from 'react'
import usersService from '../services/users'
import LoginInfo from './LoginInfo'

const User = (props) => {

    useEffect(() => {
        usersService.getUser(props.id).then(response => setUser(response))
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
            <LoginInfo />
            <p>{user.name}</p>
            {user.blogs.map((blog,id) => {
                return(
                    <p key={`title${id}`}>{blog.title}</p>
                )
            })}
        </div>
    )
}

export default User
