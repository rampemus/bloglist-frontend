import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'

//TODO: logging permanent and logout option så callad: Tee kirjautumisesta "pysyvä" local storagen avulla
//TODO: login gives user feedback

function App(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({ message: 'no notifications', error:false })

    useEffect(()=>{
        blogsService.getAll()
            .then(response => {
                setBlogs(response)
                console.log('data:',response)
            })
    },[])

    const handleLogin = async(event) => {
        event.preventDefault()
        // console.log('logging event',username, password)

        loginService.login(username,password)
            .then(response => {
                console.log(response)
                setUser(response)
                setUsername('')
                setPassword('')
                setNotification({ message: '', error:false })
            })
            .catch(error => {
                console.log(error)
                setNotification({ message: 'wrong credentials', error:true })
            })
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

    const notificationText = () => (
        <p style={notification.error ? {color: 'red'} : {color: 'green'}}>{notification.message}</p>
    )

    const blogsPreview = () => (
        <div id='preview'>
            {blogs.map( (blog,id) =>
                <p key={id}>{blog.title} {blog.author}</p>
            )}
        </div>
    )

    if ( user ) {
        return (
            <div className="App">
                <h2>blogs</h2>
                {notificationText()}
                <p>{user.name} logged in</p>
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
