import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if (response.data.code === 0) {
      //后端状态码为0说明请求成功，将响应解开一层data

      return response.data
    }

    //后端状态码不为0说明请求失败
    //输出提示信息
    ElMessage.error(response.data.message || '服务异常')
    //抛出错误
    return Promise.reject(response.data)
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。

    //如果是响应状态码为401
    //拦截到登录页面
    if (error.response?.status === 401) router.push('/login')

    //默认错误
    ElMessage.error(error.response.data.message || '服务异常')
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
