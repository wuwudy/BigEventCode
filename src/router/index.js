import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/index.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/login',
      children: [
        {
          path: '/article/channel',
          component: () => import('@/views/article/channel/index.vue')
        },
        {
          path: '/article/manager',
          component: () => import('@/views/article/manager/index.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/avatar/index.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/password/index.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/profile/index.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  // console.log('from')
  // console.log(from)
  // console.log('to')
  // console.log(to)

  const userStore = useUserStore()
  if (
    // 检查用户是否已登录
    !userStore.token &&
    // ❗️ 避免无限重定向
    to.path !== '/login'
  ) {
    // 将用户重定向到登录页面
    ElMessage.error('您还没有登录诶~')
    return '/login'
  }
})

export default router
