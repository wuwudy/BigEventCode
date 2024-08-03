import request from '@/utils/request'

//获取用户基本信息
export const getUserInfo = () => request.get('/my/userinfo')

//更新用户头像
export const updateUserAvatar = (avatar) => request.patch('/my/update/avatar', { avatar })

//更新用户密码
export const updateUserPassword = (data) => request.patch('/my/updatepwd', data)

//更新用户基本资料
export const updateUserProfile = (data) => request.put('/my/userinfo', data)
