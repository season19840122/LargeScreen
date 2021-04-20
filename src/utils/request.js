import axios from 'axios'

// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
  baseURL: 'https://test.zjzhxw.com/api/suyuan',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    console.log('config', config);
    const token = window.localStorage.getItem('Authorization');

    if(token) {
      //接入授权认证后请求服务必须在请求头中添加 Authorization
      config.headers['Authorization'] = token;
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)

    if (response.status === 200) {
      if (res && res.code !== 200) {
        return Promise.reject(new Error(res.msg))
      }
      return res
    } else {
      const errMsg = res.msg || '请求失败'
      return Promise.reject(new Error(errMsg))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
