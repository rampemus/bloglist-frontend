import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './app.css'

function App(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({ message: 'no notifications', error:false })

    useEffect(()=>{
        updateBlogs()
    },[])

    useEffect(()=>{
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    },[])

    useEffect(()=>{
        if ( notification.message.length > 0 ) {
            setTimeout(()=>{
                setNotification({ message: '', error:false })
            }, notification.message.length*100)
        }
    },[notification])

    const updateBlogs = () => {
        blogsService.getAll()
            .then(response => {
                setBlogs(response)
            })
    }

    const handleLogin = (event) => {
        event.preventDefault()

        loginService.login(username,password)
            .then(response => {
                window.localStorage.setItem(
                    'loggedBlogsUser', JSON.stringify(response)
                )
                setUser(response)
                setUsername('')
                setPassword('')
                setNotification({ message: 'login succesfully', error:false })
            })
            .catch(error => {
                setNotification({ message: 'wrong username or password', error:true })
            })
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogsUser')
        setUser(null)

    }

    const loginForm = () => (
            <form onSubmit={handleLogin}>
                <div>
                    username <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={
                            ({ target }) => setUsername(target.value)
                        }
                    />
                </div>
                <div>
                    password <input
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
    )

    const notificationText = () => {
        if ( notification.message.length > 0 )
        return <p id='notification' style={notification.error ? {
                color: 'red',
                borderColor: 'red'
            } : {
                color: 'green',
                borderColor: 'green'
            }}>
                {notification.message}
            </p>
    }

    const blogsPreview = () => (
        <div id='preview'>
            {blogs.map( (blog,id) =>
                <Blog blog={blog} setNotification={setNotification} key={id}/>
            )}
        </div>
    )

    if ( user ) {
        return (
            <div className="App">
                <h2>blogs</h2>
                {notificationText()}
                <p>{user.name} logged in <button onClick={handleLogout} type='logout'>logout</button></p>
                <Togglable buttonLabel='create blog'>
                    <BlogForm updateBlogs={updateBlogs} setNotification={setNotification}/>
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

export default App
