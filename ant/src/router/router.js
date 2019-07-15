import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config'
Vue.use(Router)

const router = new Router({
  routes: constantRouterMap
})


router.beforeEach((to, from, next) => {
  // if (1 == 1) {
  //   next({ path: '/login' })
  // } else {
  //   next();
  // }
  next();
})

export default router;