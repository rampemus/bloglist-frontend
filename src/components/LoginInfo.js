import React from 'react'
import { setUser } from '../reducers/userReducer'
import { connect } from 'react-redux'

const LoginInfo = (props) => {

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogsUser')
        props.setUser(null)
    }

    if (props.user) {
        return (
            <p>{props.user.name} logged in <button onClick={handleLogout} type='logout'>logout</button></p>
        )
    } else {
        return (
            <p>You are not logged in</p>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginInfo)