import React from 'react'
import { setUser } from '../reducers/userReducer'
import { connect } from 'react-redux'

const LoginInfo = (props) => {

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogsUser')
        props.setUser(null)
    }

    const margin = {
        margin: 10
    }

    if (props.user) {
        return (
            <div style={margin}>{props.user.name} logged in <button onClick={handleLogout} type='logout'>logout</button></div>
        )
    } else {
        return (
            <div style={margin}>You are not logged in</div>
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