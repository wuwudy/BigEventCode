import request from '@/utils/request'

//注册
export const reg = ({ username, password, repassword }) =>
  request.post('/api/reg', {
    username,
    password,
    repassword
  })

//登录
export const login = (username, password) => request.post('/api/login', { username, password })
