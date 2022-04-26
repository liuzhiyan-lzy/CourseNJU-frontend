// 引入库
import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器

service.interceptors.request.use(
  // config => {
  //   config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  // }
)

service.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config
})

// 响应拦截器
service.interceptors.response.use()


// 暴露实列
export default service
