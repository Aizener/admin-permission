import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import store from '@/store'

Vue.use(VueRouter)

const map = {
  '/menu/one': { path: 'menu/one', component: () => import('@/views/Page1.vue') },
  '/menu/two': { path: 'menu/two', component: () => import('@/views/Page1.vue') },
  '/menu/three': { path: 'menu/three', component: () => import('@/views/Page1.vue') },
  '/menu/four': { path: 'menu/four', component: () => import('@/views/Page1.vue') },
  '/menu/five': { path: 'menu/five', component: () => import('@/views/Page1.vue') }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/menu/one',
    children: []
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export const initDynamicRouter = () => {
  const routes = router.options.routes
  const route = routes.find(route => route.name === 'Home')
  const rights = store.state.user.rights
  rights.forEach(right => {
    right.children.forEach(child => {
      if (map[child.path]) {
        if (!map[child.path].meta) {
          map[child.path].meta = {}
        }
        map[child.path].meta.rights = child.rights
        route.children.push(map[child.path])
      }
    })
  })
  router.addRoutes(routes)
}

sessionStorage.getItem('v-user') && initDynamicRouter()

router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('v-user') || ''
  const encrp = sessionStorage.getItem('v-encryp') || ''
  if (to.path.toLowerCase() === '/login') {
    user ? next('/') : next()
    return false
  }
  if (!user || !encrp) {
    next({
      path: '/login',
      query: {
        message: '请先登录！',
        time: +new Date()
      }
    })
  } else if (user !== decodeURIComponent(encrp)) {
    next({
      path: '/login',
      query: {
        message: 'token已失效，请重新登录！',
        time: +new Date()
      }
    })
  } else {
    next()
  }
})

const originalPush = VueRouter.prototype.push
// 重写了原型上的push方法，统一的处理了错误信息
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
