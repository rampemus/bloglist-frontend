import React, { useState } from 'react'

//TODO: after login show blogs
//TODO: logging permanent and logout option
//TODO: login gives user feedback

function App() {
    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        console.log('logging event',username, password)
    }

    return (
        <div className="App">
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
        </div>
    )
}

export default App
