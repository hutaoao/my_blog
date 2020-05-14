module.exports = {
    user: {
        update: 'UPDATE users SET avatar = ? WHERE id = ?',
        queryAll: 'SELECT * FROM users',
        queryUsername: 'SELECT * FROM user WHERE account = ?',
        insert: 'INSERT INTO user(account,password) VALUES (?,?)'
    },
}
