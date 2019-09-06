const allBlogs = [
    {
        likes: 30,
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        user: {
            blogs: [
                '5d5d6679a1eeeafce5c1044a',
                '5d6f9b5cf101cc21cdd30e7d',
                '5d6f9c8df101cc21cdd30e7e'
            ],
            username: 'rampemus',
            name: 'Pasi Toivanen',
            id: '5d5d2aaa6c3108e7afe2cd1e'
        },
        __v: 0,
        id: '5d5d6679a1eeeafce5c1044a'
    },
    {
        likes: 15,
        title: 'Sorting javascript arrays is fun',
        author: 'Joergen Julbolls',
        url: 'joergenknowsstuff.com',
        user: {
            blogs: [
                '5d5d6679a1eeeafce5c1044a',
                '5d6f9b5cf101cc21cdd30e7d',
                '5d6f9c8df101cc21cdd30e7e'
            ],
            username: 'rampemus',
            name: 'Pasi Toivanen',
            id: '5d5d2aaa6c3108e7afe2cd1e'
        },
        __v: 0,
        id: '5d6f9b5cf101cc21cdd30e7d'
    }
]

const getAll = () => {
    return Promise.resolve(allBlogs)
}

const createBlog = (title, author, url) => {

    console.log('need to do something with', title, author, url)

    // const userToken = JSON.parse(window.localStorage.getItem('loggedBlogsUser')).token
    //
    // const data = {
    //     title: title,
    //     author: author,
    //     url: url
    // }
    //
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'bearer ' + userToken
    //     }
    // }
    //
    // const request = axios.post(baseUrl,data,config)
    // return request.then(response => response.data)
    return null
}

const setLikes = (blogId, likes) => {

    console.log('need to do something with', blogId, likes)
    //
    // const requestChanges = {
    //     likes: likes
    // }
    //
    // const userToken = JSON.parse(window.localStorage.getItem('loggedBlogsUser')).token
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'bearer ' + userToken
    //     }
    // }
    //
    // console.log('we need to send:', blogId, likes)
    //
    // const request = axios.put(baseUrl+'/'+blogId,requestChanges,config)
    // return request.then(response => response.data)
    return null
}

const deleteBlog = (blogId) => {

    console.log('need to do something with', blogId)

    // const userToken = JSON.parse(window.localStorage.getItem('loggedBlogsUser')).token
    //
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'bearer ' + userToken
    //     }
    // }
    //
    // const request = axios.delete(baseUrl+'/'+blogId, config)
    // return request.then( response => response.data )

    return null
}

export default { getAll, createBlog, setLikes, deleteBlog }
