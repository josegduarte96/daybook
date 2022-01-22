import { createRouter, createWebHashHistory } from 'vue-router'
import daybookRouter from '../modules/daybook/router'
import auhtLayout from '../modules/auth/router'
import isAuthGuard from '../modules/auth/router/authGuard'


const routes = [
  {
    path: '/daybook',
    beforeEnter: [isAuthGuard],
    ...daybookRouter
  },
  {
    path: '/',
    ...auhtLayout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
