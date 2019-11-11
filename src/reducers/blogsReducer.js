//import blogsService from '../services/blogs'

const initState = [
    {
        author: '...',
        id: 'noid',
        likes: 0,
        title: '...',
        url: '...',
        user: {
            username: '...',
            user: '...',
            blogs: [ 'noid' ],
            id: 'nouserid'
        }
    }
]

const blogsReducer = (state = initState, action) => {
    switch (action.type) {
    case 'UPDATE_BLOGS': {
        return action.data
    }
    default: return state
    }
}

export const setBlogs = (blogs) => {
    return {
        type: 'UPDATE_BLOGS',
        data: blogs
    }
}

export default blogsReducer