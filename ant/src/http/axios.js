import axios from 'axios';
import { baseUrl } from '@/settings';
import Qs from 'qs'
import router from '../router/router';

//设置超时等待时间
axios.defaults.timeout = 10000

axios.interceptors.request.use(
    config => {
        config.url = baseUrl + config.url;//url前缀
        // config.data = Qs.stringify(config.data);
        let token = 'token';
        if (token) {
            // config.headers.token = 'token';
        } else {
            router.push('/login')
        }
        // console.log(config)
        // if (config.method === 'post') {

        // }
        return config;
    }, error => {
        console.log("请求异常" + error)
        return Promise.reject(error) // 在调用的那边可以拿到(catch)错误信息
    }
)

// 响应时拦截
axios.interceptors.response.use(function (response) {
    // 返回响应时做一些处理
    let data;
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data == undefined) {
        data = JSON.parse(response.request.responseText)
    } else {
        data = response.data
    }
    return data;
}, function (err) {
    if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权，请登录'
            break
          case 403:
            err.message = '拒绝访问'
            break
          case 404:
            err.message = `请求地址出错: ${err.response.config.url}`
            break
          case 408:
            err.message = '请求超时'
            break
          case 500:
            err.message = '服务器内部错误'
            break
          case 501:
            err.message = '服务未实现'
            break
          case 502:
            err.message = '网关错误'
            break
          case 503:
            err.message = '服务不可用'
            break
          case 504:
            err.message = '网关超时'
            break
          case 505:
            err.message = 'HTTP版本不受支持'
            break
          default:
        }
      }
      console.error(err)
      return Promise.reject(err) // 返回接口返回的错误信息
});


export default axios;