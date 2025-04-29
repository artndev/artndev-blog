import axios from 'axios'
import config from './config.json'

// headers: {
//   'Access-Control-Allow-Credentials': true,
// },
const instance = axios.create({
  baseURL: config.BACKEND_URL,
  withCredentials: true,
})

export default instance
