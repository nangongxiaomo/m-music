import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/user',
      component: () => import('views/user-center/user-center')
    },
    {
      path: '/recommend',
      component: () => import('views/recommend/recommend'),
      children: [
        {
          path: ':id',
          component: () => import('views/recommend-detail/recommend-detail')
        }
      ]
    },
    {
      path: '/singer',
      component: () => import('views/singer/singer'),
      children: [
        {
          path: ':id',
          component: () => import('views/singer-detail/singer-detail')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import('views/rank/rank'),
      children: [
        {
          path: ':id',
          component: () => import('views/rank-detail/rank-detail')
        }
      ]
    },
    {
      path: '/search',
      component: () => import('views/search/search'),
      children: [
        {
          path: ':id',
          component: () => import('views/singer-detail/singer-detail')
        }
      ]
    }
  ]
})

export default router
