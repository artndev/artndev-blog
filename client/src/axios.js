import axios from 'axios'
import config from './config.json'

const instance = axios.create({
  baseURL: config.REST_API_URL,
  withCredentials: true,
})

export default instance
