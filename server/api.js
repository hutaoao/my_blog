const mysql = require('mysql');
const dbConfig = require('./db');
const sql = require('./sql');
const jwt = require('jsonwebtoken'); //生成token

const pool = mysql.createPool({
    host: dbConfig.mysql.host,
    user: dbConfig.mysql.user,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database,
    port: dbConfig.mysql.port,
    multipleStatements: true    // 多语句查询
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
                    let username = postData.email, password = postData.password;
                    connection.query(sql.user.insert, [username, password], (err, result) => {
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
        //用 加密密钥 解密，获得信息，包括生成及失效日期（如果设置了失效时间）
        let token = req.headers['token'];
        if (token) {
            jwt.verify(token, secretOrPrivateKey, (err, decoded) => {
                if (err) {
                    res.json({
                        status: false,
                        msg: '登录信息过期，请重新登陆'
                    });
                } else {
                    pool.getConnection((err, connection) => {
                        let [oldPass, newPass] = [req.body.oldPass, req.body.newPass];
                        connection.query(sql.user.queryPassword, [oldPass, decoded.userId], (err, result) => {
                            if (result.length === 0) {
                                res.json({
                                    status: false,
                                    msg: '原始密码错误'
                                });
                                connection.release();
                            } else {
                                connection.query(sql.user.changePassword, [newPass, decoded.userId], (err, result) => {
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
            })
        } else {
            res.json({
                status: false,
                msg: '登录信息过期，请重新登陆'
            });
        }
    }
}
