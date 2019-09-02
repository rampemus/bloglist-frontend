import React, { useState, useEffect } from 'react'
import loginService from './services/login'

//TODO: after login show blogs
//TODO: logging permanent and logout option
//TODO: login gives user feedback

function App() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({ message: 'no notifications', error:false })

    const handleLogin = async(event) => {
        event.preventDefault()
        console.log('logging event',username, password)

        try {
            const userData = await loginService.login(username,password)
            setUser(userData)
            setUsername('')
            setPassword('')
            setNotification({ message: 'logged in succesfully', error:false })
        } catch (exception) {
            setNotification({ message: 'wrong credentials', error:true })
        }

    }

    // userEffect(()=>{
    //
    // },[user])

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

    if ( user ) {
        return (
            <div className="App">
                <h2>blogs</h2>
                {notificationText()}
                <p>Hello {user.name}!</p>
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
