import axios from 'axios'

const request = axios.create({
  baseURL: 'http://192.169.254.76:41191'
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use((response) => {
  return response
})

export default request
