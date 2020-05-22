const express = require('express');
const router = express.Router();
const api = require('./api');

//注册
router.post('/register', (req, res, next) => {
    api.register(req, res, next);
});
//登录
router.get('/login', (req, res, next) => {
    api.login(req, res, next);
});
//修改密码
router.post('/changePassword', (req, res, next) => {
    api.changePassword(req, res, next);
});

module.exports = router;
