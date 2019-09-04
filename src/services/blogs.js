import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (title, author, url) => {

    const userToken = JSON.parse(window.localStorage.getItem('loggedBlogsUser')).token

    const data = {
        title: title,
        author: author,
        url: url
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + userToken
        }
    }

    const request = axios.post(baseUrl,data,config)
    return request.then(response => response.data)
}

const setLikes = (blogId, likes) => {

    const requestChanges = {
        likes: likes
    }

    const userToken = JSON.parse(window.localStorage.getItem('loggedBlogsUser')).token
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + userToken
        }
    }

    console.log('we need to send:', blogId, likes)

    const request = axios.put(baseUrl+'/'+blogId,requestChanges,config)
    return request.then(response => response.data)
}

const deleteBlog = (blogId) => {

    const userToken = JSON.parse(window.localStorage.getItem('loggedBlogsUser')).token

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + userToken
        }
    }

    const request = axios.delete(baseUrl+'/'+blogId, config)
    return request.then( response => response.data )
}

export default { getAll, createBlog, setLikes, deleteBlog }
