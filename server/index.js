const express = require('express');
const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据是需要

const app = express();

app.use(bodyParser.json());

// 后端api路由
app.use('/api', routerApi);
// 开放根目录下upload文件夹，使得外网可以访问
app.use('/upload', express.static('./upload'));

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
