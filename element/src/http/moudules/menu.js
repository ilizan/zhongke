import axios from '../axios';


export const menu = (data) => {
    return axios({
        url:'/menu/menu',
        method: 'post',
        data
    })
}