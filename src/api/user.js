import http from './http'

export const login = data => {
  return http('/login', 'post', data)
}