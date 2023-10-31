import request from '../utils/http'

// 分类
export const robotTypes = () => request.get('/api/robot-types')

// 查询
export const robotsApi = (params) => request.get('/api/robots', { params })

// 新增
export const addRobotApi = (data) => request.post('/api/users', data)

// 聊天记录
export const chatRecords = (params) => request.get('/api/chatRecords', { params })

// 面试
export const chat = (data) => request.post('/api/chat/chat', data)
