import axios from 'axios'
const baseUrl = '/api/login'

//:TODO: login service from backend
const login = async( username, password ) => {
    const credentials = { 'username':username, 'password':password }
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }
