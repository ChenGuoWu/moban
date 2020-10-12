import axios from 'axios'
import store from '@/store/index.js'
import qs from 'qs'
import { Notify } from 'vant';
// axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
const http = {}

var instance = axios.create({
    timeout: 5000,
    baseURL: process.env.VUE_APP_BASE_URL,
    validateStatus(status) {
        switch (status) {
            case 400:
                Notify('请求出错')
                break
            case 401:
                Notify('授权失败，请重新登录')
                return
            case 403:
                Notify('拒绝访问')
                break
            case 404:
                Notify('请求错误,未找到该资源')
                break
            case 500:
                Notify('服务端错误')
                break
        }
        return status >= 200 && status < 300
    }
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // 添加请求拦截器
instance.interceptors.request.use(
        function(config) {
            // 展示loading
            store.commit('show_loading')
                // 请求头添加token
            if (window.localStorage.getItem('userToken')) {
                config.headers.token =window.localStorage.getItem('userToken')
            }
            return config
        },
        function(error) {
            return Promise.reject(error)
        }
    )
    // 响应拦截器即异常处理
instance.interceptors.response.use(
    response => {
        // 隐藏设置全局loading
        store.commit('hide_loading')
        return response//这里可以减少一层data 根据后端返回的情况来定
    },
    err => {
        if (err && err.response) {} else {
            err.message = '连接服务器失败'
        }
        return Promise.reject(err.response)
    }
)
http.get = function(url, options) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, options)
            .then(response => {
                if (response.status === 200) { //这里状态码可能不同不一定是status
                    resolve(response)
                } else {
                    reject(response.msg)//这里看看是msg还是啥
                }
             
            })
            .catch(e => {
                console.log(e)
            })
    })
}
http.post = function(url, options) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, qs.stringify(options))
            .then(response => {
                if (response.status === 200) {//这里状态码可能不同
                    resolve(response)
                } else {
                    reject(response.message)  //这里也是一样
                }
             
            })
            .catch(e => {
                console.log(e)
            })
    })
}
export default http