import axios from 'axios'
const baseUrl = '/api/blogs'

//TODO: login user can create blogs

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (title, author, url, userToken) => {
    // const request = axios.post({ })
    console.log('now need to send ', title, author, url, userToken)

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

export default { getAll, createBlog }
