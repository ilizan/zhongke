import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import api from './api'
import 'babel-polyfill'//兼容ie，360兼容模式
Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(api);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
