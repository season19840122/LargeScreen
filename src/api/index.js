import request from '../utils/request'

export const getData = data => {
  return request({
    url: '/bs/split/unite',
    method: 'get',
    params: data
  })
}

