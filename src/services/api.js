import axios from 'axios'

const api = axios.create({
    baseURL: 'http://198.50.130.238:8080/'
})

export default api