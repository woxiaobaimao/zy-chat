import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'robot'
    },
    {
      path: '/square',
      name: 'square',
      component: () => import('../views/Square.vue'),
      meta: { index: 1 }
    },
    {
      path: '/robot',
      name: 'robot',
      component: () => import('../views/Robot.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
      meta: { index: 5 }
    },
    {
      path: '/draw',
      name: 'draw',
      component: () => import('../views/AIDraw.vue'),
      meta: { index: 6 }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/writting',
      name: 'writting',
      component: () => import('../views/Writting.vue')
    },
    {
      path: '/robotInfo',
      name: 'robotInfo',
      component: () => import('../views/RobotInfo.vue')
    }
  ]
})

export default router
