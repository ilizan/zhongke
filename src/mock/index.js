import Mock from 'mockjs'
import { baseUrl } from '@/settings'
import * as login from './modules/login'
import * as menu from './modules/menu'

let openMock = true
fnCreate(login, openMock)
fnCreate(menu, openMock)

function fnCreate(mod, isOpen = true) {

  if (isOpen) {
    for (var key in mod) {
      ((res) => {
        if (res.isOpen !== false) {
          let url = baseUrl
          console.log(url);
          if (!url.endsWith("/")) {
            url = url + "/"
          }
          url = url + res.url
          Mock.mock(new RegExp(url), res.type, (opts) => {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            console.log('\n')
            console.log('%cmock拦截, 请求: ', 'color:blue', opts)
            console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
            return res.data
          })
        }
      })(mod[key]() || {})
    }
  }
}