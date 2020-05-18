module.exports = {
    user: {
        update: 'UPDATE user SET avatar = ? WHERE id = ?',
        queryAll: 'SELECT * FROM user',
        queryUsername: 'SELECT * FROM user WHERE account = ?',
        insert: 'INSERT INTO user(account,password) VALUES (?,?)'
    },
}
