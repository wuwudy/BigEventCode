import request from '@/utils/request.js'

// 获取文章分类
export const getArticleChannel = () => request.get('/my/cate/list')

// 获取文章分类详情
export const getArticleChannelDetail = (id) => request.get(`/my/cate/info?id=${id}`)

// 增加文章分类
export const addArticleChannel = ({ cate_name, cate_alias }) =>
  request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })

// 更新文章分类
export const updateArticleChannel = ({ id, cate_name, cate_alias }) =>
  request.put('/my/cate/info', {
    id,
    cate_name,
    cate_alias
  })

// 删除文章分类
export const deleteArticleChannel = (id) => request.delete(`/my/cate/del?id=${id}`)
