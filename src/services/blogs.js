import axios from 'axios'
const baseUrl = '/api/blogs'

//TODO: login user can create blogs

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }
