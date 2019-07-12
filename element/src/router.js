import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Welcome from './views/Welcome.vue'
import Cookies from 'js-cookie'
import api from './http/api'
import store from './store/index'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'welcome',
          component: Welcome
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})


router.beforeEach((to, from, next) => {
  let token = Cookies.get('token')
  if (to.path == '/login') {
    if (token) {//已存有token，跳转首页
      next({ path: '/' })
    } else {
      next();
    }
  } else {
    if (!token) {
      next({ path: '/login' })
    } else {
      let user = sessionStorage.getItem('user');
      let userId = JSON.parse(user).userId;
      //动态请求菜单
      addMentRoutes(userId, to, from);
      next();
      console.log('111')
    }
  }
});

function addMentRoutes(userId, to, from) {
  if (store.state.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  api.menu.menu({ 'userId': userId }).then(res => {
    console.log(res)
    //添加动态路由
    let dynamicRoutes = addDynamicRoutes(res.data);

    //绑定静态路由
    handleStaticComponent(router, dynamicRoutes);

    router.addRoutes(router.options.routes)
    // 保存加载状态
    store.commit('menuRouteLoaded', true)

    store.commit('setMenuTree', res.data)
  }).then(res => {

  });
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
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      let array = menuList[i].url.split('/');
      let url = '';
      for (let i = 0; i < array.length; i++) {
        url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
      }
      url = url.substring(0, url.length - 1);
      route['component'] = resolve => require([`@/views/${url}`], resolve);
      routes.push(route)
    }
  }

  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}
export default router