module.exports = {
    user: {
        changePassword: 'UPDATE user SET password = ? WHERE id = ?', //修改密码
        queryUsername: 'SELECT * FROM user WHERE email = ?', //查询账号
        queryPassword: 'SELECT id FROM user WHERE password = ? AND id = ?', //查询老密码是否正确
        insert: 'INSERT INTO user(email,nickname,password) VALUES (?,?,?)', //注册
    },
}
