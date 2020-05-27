module.exports = {
    user: {
        changePassword: 'UPDATE user SET password = ? WHERE id = ?', //修改密码
        queryUsername: 'SELECT * FROM user WHERE email = ?', //查询账号
        queryPassword: 'SELECT id FROM user WHERE password = ? AND id = ?', //查询老密码是否正确
        register: 'INSERT INTO user(email, nickname, password) VALUES (?,?,?)', //注册
        uploadPic: 'UPDATE user SET portrait = ? WHERE id = ?', //上传头像
    },
    article: {
        queryByAddTitle: 'SELECT * FROM article WHERE title = ?', //查询标题是否重复 - 新增
        queryByUpTitle: 'SELECT * FROM article WHERE title = ? AND id <> ?', //查询标题是否重复 - 新增
        add: 'INSERT INTO article(user_id, title, introduce, tags, content, html, creat_at, status) VALUES (?,?,?,?,?,?,?,?)', //新增文章
        update: 'UPDATE article SET title = ?, introduce = ?, tags = ?, content = ?, html = ?, update_at = ?, status = ? WHERE id = ?', //更新文章
        getByUser: 'SELECT * FROM article WHERE user_id = ? AND status <> 0', //获取文章列表
        getById: 'SELECT * FROM article WHERE id = ?', //获取文章详情
        getAll: 'SELECT * FROM article WHERE status <> 0', //获取所有文章列表
        publish: 'UPDATE article SET status = 1 WHERE id = ?', //发布文章
        delete: 'UPDATE article SET status = 0 WHERE id = ?', //删除文章 - 逻辑删除
    }
}
