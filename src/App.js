import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import notificationReducer, { showNotification } from './reducers/notificationReducer'
import useField from './hooks/useField'
import './app.css'

function App(props) {

    const username = useField('text')
    const password = useField('password')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    useEffect( () => {
        updateBlogs()
    },[])

    useEffect( () => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    },[])

    // useEffect( () => {
    //     if ( notification.message.length > 0 ) {
    //         setTimeout(() => {
    //             setNotification({ message: '', error:false })
    //         }, notification.message.length*100)
    //     }
    // },[notification])

    const updateBlogs = () => {
        blogsService.getAll()
            .then(response => {
                setBlogs(response)
            })
    }

    const handleLogin = (event) => {
        event.preventDefault()

        loginService.login(username.value,password.value)
            .then(response => {
                window.localStorage.setItem(
                    'loggedBlogsUser', JSON.stringify(response)
                )
                setUser(response)
                username.reset()
                password.reset()
                props.showNotification( 'login succesfully', false ) //like this
            })
            .catch( () => {
                props.showNotification( 'wrong username or password', true )
            })
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogsUser')
        setUser(null)

    }

    const notificationText = () => {
        if ( props.message.length > 0 )
            return <p id='notification' style={props.error ? {
                color: 'red',
                borderColor: 'red'
            } : {
                color: 'green',
                borderColor: 'green'
            }}>
                {props.message}
            </p>
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username <input
                    id='username'
                    name='Username'
                    {...username}
                    reset='null'
                />
            </div>
            <div>
                password <input
                    id='password'
                    name='Password'
                    {...password}
                    reset='null'
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )

    const blogsPreview = () => {
        // console.log('blogsPreview: blogs[0].user',blogs[0].user.username,'user.id', user.username)
        return <div id='preview'>
            {blogs.sort((a, b) => b.likes - a.likes).map( (blog,id) =>
                <Blog
                    blog={blog}
                    ownedByUser={blog.user.username === user.username}
                    updateBlogs={updateBlogs}
                    key={id}
                />
            )}
        </div>
    }

    if ( user ) {
        return (
            <div className="App">
                <h2>blogs</h2>
                {notificationText()}
                <p>{user.name} logged in <button onClick={handleLogout} type='logout'>logout</button></p>
                <Togglable buttonLabel='create blog'>
                    <BlogForm updateBlogs={updateBlogs}/>
                </Togglable>
                {blogs.length > 0 && blogsPreview()}
            </div>
        )
    } else {
        return (
            <div className="App">
                <h2>log in to application</h2>
                {notificationText()}
                {loginForm()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
        error: state.error
    }
}

const mapDispatchToProps = {
    showNotification
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
