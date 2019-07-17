import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import { constantRouterMap, navTreeData } from './router.config'
import api from '../http/api'
import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: constantRouterMap//.concat(navTreeData)
})


router.beforeEach((to, from, next) => {
  const user = Cookies.get('user');
  if (to.path == '/login') {
    if (user) {
      next({ path: '/' })
    } else {
      next();
    }
  } else {
    if (!user) {
      next({ path: '/login' })
    } else {
      //跳转
      if (!store.state.menuRouteLoaded) {
        //动态请求菜单
        addMentRoutes(1, to, from);
        next({ ...to, replace: true })
      }else{
        next();
      }
    }
  }
})

function addMentRoutes(userId, to, from) {
  // if (!store.state.menuRouteLoaded) {
    // console.log('动态菜单和路由已经存在.')
    // return

    //动态获得菜单权限
    let dyRoutes = addDynamicRoutes(navTreeData);
    // //绑定静态路由
    handleStaticComponent(router, dyRoutes);
    router.addRoutes(router.options.routes)
    Cookies.set('menuTree', navTreeData)

    // 保存加载状态
    store.commit('menuRouteLoaded', true)
  // }
}

function handleStaticComponent(router, dynamicRoutes) {
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes(menuList = [], routes = []) {

  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].path && /\S/.test(menuList[i].path)) {
      menuList[i].path = menuList[i].path.replace(/^\//, '')
      routes.push(menuList[i])
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log('动态路由加载完成.')
  }
  return routes
}
export default router;