import axios from 'axios'
const baseUrl = '/api/login'

//:TODO: login service from backend
const login = ( username, password ) => {
    const credentials = { 'username':username, 'password':password }
    const request = axios.post(baseUrl, credentials)
    return request.then(response => response.data)
}

export default { login }
