import axios from 'axios'
import config from './config.json'

const instance = axios.create({
  baseURL: config.BACKEND_URL,
  withCredentials: true,
})

export default instance
