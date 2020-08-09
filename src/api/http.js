import Axios from 'axios'

const axios = Axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '' : '',
})

export default (url, method = 'get', data = {}) => {
  return axios({
    url,
    method,
    data
  })
}