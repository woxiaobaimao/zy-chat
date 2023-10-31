import request from '../utils/http'
// 登录
export const login = (data) => request.post('/api/user-tokens', data)
// 获取用户信息
export const getUserInfoApi = () => request.get('/api/users')
