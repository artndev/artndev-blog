import axios from 'axios'
import config from './config.json'

// withCredentials: true,
const instance = axios.create({
  baseURL: config.BACKEND_URL,
  headers: {
    'Access-Control-Allow-Credentials': true,
  },
})

export default instance
