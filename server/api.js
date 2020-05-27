const mysql = require('mysql');
const sql = require('./sql');
const jwt = require('jsonwebtoken'); //生成token

//链接数据库
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'qwer1234',
    database: 'my_blog',
    port: '3306',
    multipleStatements: true // 多语句查询
});


const secretOrPrivateKey = "ht";// 这是加密的key（密钥）

module.exports = {
    //登录
    login(req, res, next) {
        pool.getConnection((err, connection) => {
            let postData = req.query;
            connection.query(sql.user.queryUsername, [postData.email], (err, result) => {
                if (result.length === 0) {
                    res.json({
                        status: false,
                        msg: '用户不存在'
                    });
                } else {
                    if (result[0].password !== postData.password) {
                        res.json({
                            status: false,
                            msg: '密码错误'
                        });
                    } else {
                        let userInfo = {userId: result[0].id}; // 要生成token的主体信息
                        let token = jwt.sign(userInfo, secretOrPrivateKey, {
                            expiresIn: 60 * 60 * 1  // 1小时过期
                        });
                        res.json({
                            status: true,
                            msg: '登录成功',
                            data: {
                                token: token,
                                portrait: result[0].portrait,
                                nickname: result[0].nickname
                            }
                        });
                    }
                }
                connection.release();
            })
        })
    },
    // 注册
    register(req, res, next) {
        pool.getConnection((err, connection) => {
            let postData = req.body;
            connection.query(sql.user.queryUsername, [postData.email], (err, result) => {
                if (result.length !== 0) {
                    res.json({
                        status: false,
                        msg: '用户已存在'
                    });
                    connection.release();
                } else {
                    let [username, nickname, password] = [postData.email, postData.nickname, postData.password];
                    connection.query(sql.user.register, [username, nickname, password], (err, result) => {
                        let status = true, msg = '注册成功';
                        if (err) {
                            status = false;
                            msg = '服务器出错,请稍后再试';
                        }
                        res.json({
                            status: status,
                            msg: msg
                        });
                        connection.release();
                    })
                }
            })
        })
    },
    //修改密码
    changePassword(req, res, next) {
        const userId = this.checkJwt(req, res);
        if (userId) {
            pool.getConnection((err, connection) => {
                let [oldPass, newPass] = [req.body.oldPass, req.body.newPass];
                connection.query(sql.user.queryPassword, [oldPass, userId], (err, result) => {
                    if (result.length === 0) {
                        res.json({
                            status: false,
                            msg: '原始密码错误'
                        });
                        connection.release();
                    } else {
                        connection.query(sql.user.changePassword, [newPass, userId], (err, result) => {
                            if (err) {
                                res.json({
                                    status: false,
                                    msg: '服务器出错,请稍后再试'
                                });
                            }
                            res.json({
                                status: true,
                                msg: '密码修改成功'
                            });
                            connection.release();
                        })
                    }
                })
            })
        }
    },
    //上传图片
    uploadPic(req, res, next) {
        const url = '/upload/' + req.file.filename;
        const userId = this.checkJwt(req, res);
        if (userId) {
            pool.getConnection((err, connection) => {
                connection.query(sql.user.uploadPic, [url, userId], (err, result) => {
                    if (err) {
                        res.json({
                            status: false,
                            msg: '服务器出错,请稍后再试'
                        });
                    }
                    res.json({
                        status: true,
                        data: url,
                        msg: '头像上传成功'
                    });
                    connection.release();
                })
            })
        }
    },
    //校验token - 返回userId
    checkJwt(req, res) {
        let userId = '';
        const info = {
            status: false,
            msg: '登录信息过期，请重新登陆'
        };
        //用 加密密钥 解密，获得信息，包括生成及失效日期（如果设置了失效时间）
        let token = req.headers['token'];
        if (token) {
            jwt.verify(token, secretOrPrivateKey, (err, decoded) => {
                if (err) {
                    res.json(info);
                    return false;
                } else {
                    userId = decoded.userId;
                }
            })
        } else {
            res.json(info);
            return false;
        }
        return userId;
    },
    //读取图片
    getImg(req, res, next) {
        res.sendFile(__dirname + "/" + req.url);
    },
    //发布文章
    addArticle(req, res) {
        const userId = this.checkJwt(req, res);
        if (userId) {
            pool.getConnection((err, connection) => {
                let postData = req.body;
                let creat_at = new Date();
                connection.query(sql.article.queryByAddTitle, [postData.title], (err, result) => {
                    if (result.length > 0) {
                        res.json({
                            status: false,
                            msg: '文章标题已存在',
                        });
                        connection.release();
                    } else {
                        let tags = postData.tags.join(',');
                        connection.query(sql.article.add, [userId, postData.title, postData.introduce, tags, postData.content, postData.html, creat_at, postData.status], (err, result) => {
                            if (err !== null) {
                                res.json({
                                    status: false,
                                    msg: '添加失败',
                                });
                            } else {
                                res.json({
                                    status: true,
                                    msg: '添加成功',
                                });
                            }
                            connection.release();
                        })
                    }
                })
            })
        }
    },
    //编辑文章
    updateArticle(req, res) {
        const userId = this.checkJwt(req, res);
        if (userId) {
            pool.getConnection((err, connection) => {
                let postData = req.body;
                let update_at = new Date();
                connection.query(sql.article.queryByUpTitle, [postData.title, postData.id], (err, result) => {
                    if (result.length > 0) {
                        res.json({
                            status: false,
                            msg: '文章标题已存在',
                        });
                        connection.release();
                    } else {
                        let tags = postData.tags.join(',');
                        connection.query(sql.article.update, [postData.title, postData.introduce, tags, postData.content, postData.html, update_at, postData.status, postData.id], (err, result) => {
                            console.log(err)
                            if (err !== null) {
                                res.json({
                                    status: false,
                                    msg: '修改失败',
                                });
                            } else {
                                res.json({
                                    status: true,
                                    msg: '修改成功',
                                });
                            }
                            connection.release();
                        })
                    }
                })
            })
        }
    },
    //获取文章列表 - by user
    getArticle(req, res) {
        const userId = this.checkJwt(req, res);
        if (userId) {
            pool.getConnection((err, connection) => {
                connection.query(sql.article.getByUser, [userId], (err, result) => {
                    if (err) {
                        res.json({
                            status: false,
                            msg: '服务器出错,请稍后再试'
                        });
                    }
                    res.json({
                        status: true,
                        data: result
                    });
                    connection.release();
                })
            })
        }
    },
    //获取所有文章
    getAllArticle(req, res) {
        const userId = this.checkJwt(req, res);
        if (userId) {
            pool.getConnection((err, connection) => {
                connection.query(sql.article.getAll, [], (err, result) => {
                    if (err) {
                        res.json({
                            status: false,
                            msg: '服务器出错,请稍后再试'
                        });
                    }
                    res.json({
                        status: true,
                        data: result
                    });
                    connection.release();
                })
            })
        }
    },
    //获取文章详情
    getDetailArticle(req, res){
        const userId = this.checkJwt(req, res);
        if (userId) {
            pool.getConnection((err, connection) => {
                connection.query(sql.article.getById, [req.query.id], (err, result) => {
                    if (err) {
                        res.json({
                            status: false,
                            msg: '服务器出错,请稍后再试'
                        });
                    }
                    res.json({
                        status: true,
                        data: result[0]
                    });
                    connection.release();
                })
            })
        }
    },
    //删除文章
    delArticle(req, res) {
        const userId = this.checkJwt(req, res);
        if (userId) {
            pool.getConnection((err, connection) => {
                connection.query(sql.article.delete, [req.body.id], (err, result) => {
                    if (err) {
                        res.json({
                            status: false,
                            msg: '服务器出错,请稍后再试'
                        });
                    }
                    res.json({
                        status: true,
                        msg: '删除成功'
                    });
                    connection.release();
                })
            })
        }
    },
    //发布文章
    pubArticle(req, res) {
        const userId = this.checkJwt(req, res);
        if(userId){
            pool.getConnection((err, connection)=>{
                connection.query(sql.article.publish, [req.body.id], (err, result)=>{
                    if (err) {
                        res.json({
                            status: false,
                            msg: '服务器出错,请稍后再试'
                        });
                    }
                    res.json({
                        status: true,
                        msg: '发布成功'
                    });
                    connection.release();
                })
            })
        }
    },
    //
}
