import request from '@/utils/request.js'

// 获取文章
export const getArticleList = (params) => request.get('/my/article/list', { params })

// 获取文章详情
export const getArticleDetail = (id) =>
  request.get('/my/article/info', {
    params: {
      id
    }
  })

// 发布文章
export const publishArticle = (data) => request.post('/my/article/add', data)

// 更新文章
export const updateArticle = (data) => request.put('/my/article/info', data)

// 删除文章
export const deleteArticle = (id) =>
  request.delete('/my/article/info', {
    params: {
      id
    }
  })
