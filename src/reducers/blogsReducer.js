//import blogsService from '../services/blogs'

export const initBlogs = [
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

const blogsReducer = (state = initBlogs, action) => {
    switch (action.type) {
    case 'UPDATE_BLOGS': {
        console.log('In reducer:', action.data)
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