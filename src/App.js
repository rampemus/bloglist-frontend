import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import loginService from './services/login'
import User from './components/User'
import blogsService from './services/blogs'
import Users from './components/Users'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginInfo from './components/LoginInfo'
import { showNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import useField from './hooks/useField'
import './app.css'
import { Navbar, NavItem, Alert, Form, Button, Row } from 'react-bootstrap'


const App = (props) => {

    const username = useField('text')
    const password = useField('password')

    useEffect( () => {
        updateBlogs()
        // TODO: implement thunk redux to remove this warning
        // eslint-disable-next-line
    }, [])

    useEffect( () => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            props.setUser(user)
        }
        // TODO: implement thunk redux to remove this warning
        // eslint-disable-next-line
    },[])

    const updateBlogs = () => {
        blogsService.getAll()
            .then(response => {
                props.setBlogs(response)
            })
    }

    const handleLogin = (event) => {
        event.preventDefault()

        loginService.login(username.value,password.value)
            .then(response => {
                window.localStorage.setItem(
                    'loggedBlogsUser', JSON.stringify(response)
                )
                props.setUser(response)
                username.reset()
                password.reset()
                props.showNotification( 'login succesfully', false ) //like this
            })
            .catch( () => {
                props.showNotification( 'wrong username or password', true )
            })
    }

    const notificationText = () => {
        if ( props.message.length > 0 )
            return <Alert id='notification' variant={props.error ? 'danger' : 'success'}>
                {props.message}
            </Alert>
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>username</Form.Label> <input
                    id='username'
                    name='Username'
                    {...username}
                    reset='null'
                />
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>password</Form.Label> <input
                    id='password'
                    name='Password'
                    {...password}
                    reset='null'
                />
            </Form.Group>
            <Button variant="primary" type='submit'>login</Button>
        </form>
    )

    const blogsPreview = () => {
        return <div id='preview'>
            {props.blogs.sort((a, b) => b.likes - a.likes).map( (blog,id) =>
                <Link key={`link${id}`} to={`/blogs/${blog.id}`}>
                    <p key={`blogli${id}`}>
                        {blog.title} by {blog.author}
                    </p>
                </Link>
                // <BlogOld
                //     blog={blog}
                //     ownedByUser={blog.user.username === props.user.username}
                //     updateBlogs={updateBlogs}
                //     key={id}
                // />
            )}
        </div>
    }

    const home = () => {
        if ( !props.user ) {
            return login()
        }
        return (
            <div className="App">
                <h2>blogs</h2>
                <Togglable buttonLabel='create blog' className='container'>
                    <BlogForm updateBlogs={updateBlogs} />
                </Togglable>
                {props.blogs.length > 0 && blogsPreview()}
            </div>
        )
    }

    const login = () => {
        return (
            <div className="App">
                <h2>log in to application</h2>
                {notificationText()}
                {loginForm()}
            </div>
        )
    }

    const margin = { margin:10 }

    return (
        <div>
            
            <Router>
                <div className="menu">
                    <Navbar>
                        <Navbar.Brand>Blog-app</Navbar.Brand>
                        <NavItem><Link style={margin} to="/">home</Link></NavItem>
                        <NavItem><Link style={margin} to="/users">users</Link></NavItem>
                        <LoginInfo />
                    </Navbar>
                </div>
                {notificationText()}
                <div className="container">
                    <Route exact path="/" render={() => home()} />
                    <Route exact path="/users" render={() => <Users />} />
                    <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
                    <Route exact path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} />} />
                </div>
            </Router>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.notification.message,
        error: state.notification.error,
        blogs: state.blogs,
        user: state.user
    }
}

const mapDispatchToProps = {
    showNotification,
    setBlogs,
    setUser
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
