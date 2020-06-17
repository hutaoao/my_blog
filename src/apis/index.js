import Axios from 'axios';
import {Message} from "element-ui";

let URL = '/api';

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
        if (response.data.msg === '登录信息过期，请重新登陆') {
            Message.error('登录信息过期，即将重新登陆');
            setInterval(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            return response;
        }
    }, error => {
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

//上传图片
export const uploadImg = params => {
    return Axios.post(`${URL}/uploadImg`, params)
};

//获取图片
export const getImg = params => {
    return Axios.get(`${URL}/getImg`, {params})
};

//文章存稿
export const addArticle = params => {
    return Axios.post(`${URL}/addArticle`, params)
};

//编辑文章
export const updateArticle = params => {
    return Axios.post(`${URL}/updateArticle`, params)
};

//获取文章列表 - by user
export const getArticle = params => {
    return Axios.get(`${URL}/getArticle`, {params})
};

//获取所有文章列表
export const getAllArticle = params => {
    return Axios.get(`${URL}/getAllArticle`, {params})
};

//获取所有文章详情 - 需要登录验证
export const getDetailArticle = params => {
    return Axios.get(`${URL}/getDetailArticle`, {params})
};

//获取所有文章详情 - 不需要登录验证
export const getArticleDetail = params => {
    return Axios.get(`${URL}/getArticleDetail`, {params})
};

//删除文章
export const delArticle = params => {
    return Axios.post(`${URL}/delArticle`, params)
};

//发布文章
export const pubArticle = params => {
    return Axios.post(`${URL}/pubArticle`, params)
};