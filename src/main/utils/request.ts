import axios from 'axios'
import qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://127.0.0.1:8888',
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  (config) => { 
    if (config.method?.toLowerCase() === 'get' && config.params) {
      config.url += '?' + qs.stringify(config.params || {})
    }

    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
