import axios from '../axios';



//登录
export const login = data => {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}