import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from './router/router'
import api from './http'
import store from './store'
import mock from "@/mock/index"

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(api);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
