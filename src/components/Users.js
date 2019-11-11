import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { Table } from 'react-bootstrap'

const Users = () => {

    const initialUserList = [
        {
            'blogs': [],
            'username': '...',
            'name': '...',
            'id': '...'
        },
    ]

    const [users, setUsers] = useState(initialUserList)

    useEffect(() => {
        usersService.getAll().then(response => setUsers(response))
    }, [])

    return(
        <div>
            <h2>users</h2>
            <Table borderless responsive>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length && users.map( (user, id) => {
                        return(
                            <tr key={`userinfo${id}`}>
                                <td key={`username${id}`}>
                                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                                </td>
                                <td key={`blogsum${id}`}>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Users

