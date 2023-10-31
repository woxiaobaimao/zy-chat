import axios from 'axios' //创建一个axios的对象
import { useUserStore } from '@/store/user'

//生成一个axios的实例
const request = axios.create({
  timeout: 30000 //请求超时
})
// http.defaults.headers['api_token'] = localStorage.getItem('token') || '' //在请求头中传入token

request.interceptors.request.use(
  (config) => {
    const { token } = useUserStore()
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // if (response.data.code !== '0') {
    //   // 如果请求失败，引入ElMessage并显示错误消息
    //   // ElMessage.error('请求失败：' + response.data.msg)
    //   return Promise.reject(response.data)
    // }
    // 如果请求成功，返回response.data
    return response.data
  },
  (error) => {
    // 如果请求失败，引入ElMessage并显示错误消息
    // ElMessage.error('请求出错了：' + error.message)
    return Promise.reject(error)
  }
)

export default request //导出
