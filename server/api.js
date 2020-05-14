const mysql = require('mysql');
const dbConfig = require('./db');
const sql = require('./sql');

const pool = mysql.createPool({
    host: dbConfig.mysql.host,
    user: dbConfig.mysql.user,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database,
    port: dbConfig.mysql.port,
    multipleStatements: true    // 多语句查询
});

module.exports = {
    // 注册
    register(req, res, next) {
        pool.getConnection((err, connection) => {
            let postData = req.body;
            connection.query(sql.user.queryUsername, [postData.account], (err, result) => {
                if (result.length !== 0) {
                    res.json({
                        status: false,
                        msg: '用户已存在'
                    });
                    connection.release();
                } else {
                    let username = postData.account, password = postData.password;
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
}
