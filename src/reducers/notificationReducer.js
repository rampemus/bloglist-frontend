const initState = {
    message: 'no notifications in store',
    error: false
}

const notificationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            const newState = { message: action.data.message, error: action.data.error }
            return newState
        default: return state
    }
}


export const showNotification = (message, error) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: { message:message, error:error }
    }
}

export default notificationReducer
