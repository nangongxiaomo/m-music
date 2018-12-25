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
      path: '/recommend',
      component: () => import('views/recommend/recommend')
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
      component: () => import('views/rank/rank')
    },
    {
      path: '/search',
      component: () => import('views/search/search')
    }
  ]
})

export default router
