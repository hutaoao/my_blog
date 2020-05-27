const express = require('express');
const router = express.Router();
const api = require('./api');
const multer = require("multer"); //图片上传
const fs = require('fs');

const createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
const uploadFolder = './upload';
createFolder(uploadFolder);
// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split('.');
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
});
// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({storage: storage})

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

//上传头像
router.post('/uploadImg', upload.single('imgFile'), (req, res, next) => {
    api.uploadPic(req, res, next);
})

//获取头像
router.get('/getImg/*', (req, res, next) => {
    api.getImg(req, res, next);
})

//文章存稿
router.post('/addArticle', (req, res, next) => {
    api.addArticle(req, res, next);
})

//编辑文章
router.post('/updateArticle', (req, res, next) => {
    api.updateArticle(req, res, next);
})

//获取文章列表 - by user
router.get('/getArticle', (req, res, next) => {
    api.getArticle(req, res, next);
})

//获取所有文章
router.get('/getAllArticle', (req, res, next) => {
    api.getAllArticle(req, res, next);
})

//获取文章详情
router.get('/getDetailArticle', (req, res, next) => {
    api.getDetailArticle(req, res, next);
})

//删除文章
router.post('/delArticle', (req, res, next) => {
    api.delArticle(req, res, next);
})

//发布文章
router.post('/pubArticle', (req, res, next) => {
    api.pubArticle(req, res, next);
})

module.exports = router;
