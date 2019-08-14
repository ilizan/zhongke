import axios from 'axios';
import qs from 'qs'
import Cookies from "js-cookie";

// let base = 'http://192.168.0.167:81';
let base = 'http://reg.zkcmg.com';

//登录
export const loginApi = data => {
    return axios({
        url: base + '/Room.ashx',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        data: qs.stringify(data)
    }).then(res => res.data)
}

//
export const postRoomApi = data => {
    return axios({
        url: base + '/Room.ashx',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'AdminGuid': JSON.parse(Cookies.get("user")).guid
        },
        method: 'post',
        data: qs.stringify(data)
    }).then(res => res.data)
}

export default {
    loginApi,
    postRoomApi
}