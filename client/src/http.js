import axios from 'axios';
import router from './router/index';

//请求拦截
axios.interceptors.request.use(config => {
    if (localStorage.wxToken) {
        config.headers.Authorization = localStorage.wxToken;
    }
    return config;
},error => {
    return Promise.reject(error);
})

//响应拦截
axios.interceptors.response.use(response => {
    return response;
},err => {
    //错误提醒
    const { status } = err.response;
    if (status == 401) {
        alert("登陆失效，请重新登陆!");

        //清除token
        localStorage.removeItem('wxToken');
        router.push("/login");
    }
    // alert(err.response.data);
    return Promise.reject(err);
})

export default axios;