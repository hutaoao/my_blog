import Axios from 'axios'

let URL = '';

// 请求拦截器
Axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = sessionStorage.getItem('token');
        token && (config.headers.token = token);
        return config;
    }, error => {
        return Promise.error(error);
    });

// 响应拦截
Axios.interceptors.response.use(
    response => {
        if(response.data.msg === '登录信息过期，请重新登陆'){
            window.location.href = '/login';
        }else{
            return response;
        }
    },error => {
        console.log(error)
    }
);

//注册
export const register = params => {
    return Axios.post(`${URL}/register`, params)
};

//登录
export const login = params => {
    return Axios.get(`${URL}/login`, {params})
};

//修改密码
export const changePassword = params => {
    return Axios.post(`${URL}/changePassword`, params)
};
