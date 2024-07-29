import { createRouter, createWebHistory } from 'vue-router'

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

export default router
