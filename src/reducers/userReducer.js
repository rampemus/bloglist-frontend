const initState = {}

const userReducer = (state = initState, action) => {
    switch (action.type) {
    case 'SET_USER': {
        return action.data
    }
    default: return state
    }
}

export const setUser = (data) => {
    return {
        type: 'SET_USER',
        data: data
    }
}

export default userReducer