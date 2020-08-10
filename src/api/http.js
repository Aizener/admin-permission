import Axios from 'axios'
import router from '@/router'

const axios = Axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '' : '',
})

const map = {
  get: 'view',
  put: 'edit',
  post: 'add',
  delete: 'delete'
}

axios.interceptors.request.use(config => {
  const rights = router.currentRoute.meta.rights || []
  console.log(rights)
  if (config.url !== '/login' && !rights.includes(map[config.method])) {
    return Promise.reject(new Error('没有权限操作！'))
  }
  return config
})

export default (url, method = 'get', data = {}) => {
  return axios({
    url,
    method,
    data
  })
}