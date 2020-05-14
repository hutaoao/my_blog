import Axios from 'axios'

let URL = '';

// 请求拦截器
Axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = sessionStorage.getItem('jwtToken');
        // token && (config.headers.jwtToken = token);
        return config;
    }, error => {
        return Promise.error(error);
    });

// 响应拦截
Axios.interceptors.response.use(
    response => {
        if(response.data.msg === '用户已登出！'){
            window.location.href = '/ui/web/login'
        }else{
            return response;
        }
    },error => {
        console.log(error)
    }
);

export const login = params => {
    return Axios.post(`${URL}/register`, params)
};
