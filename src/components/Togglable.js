import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = {
        display: visible ? '' : 'none',
        marginBottom:'10px',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'lightgrey'
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <Form.Group style={hideWhenVisible}>
                <Button variant="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </Form.Group>
            <Form.Group style={showWhenVisible}>
                <Form.Label style={{ textAlign: 'center' }}>Create new blog</Form.Label>
                {props.children}
                <Button variant="secondary" onClick={toggleVisibility}>cancel</Button>
            </Form.Group>
        </div>
    )
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable
