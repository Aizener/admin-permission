import http from './http'

export const getList = data => {
  return http('/list', 'get', data)
}

export const getTotal = () => {
  return http('/list/total')
}

export const getListByValue = data => {
  return http('/list/value', 'get', data)
}

export const addList = data => {
  return http('/list/add', 'post', data)
}

export const updateList = data => {
  return http('/list/update', 'put', data)
}

export const deleteList = data => {
  return http('/list/delete', 'delete', data)
}