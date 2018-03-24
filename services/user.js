const db = require('../index');

module.exports = class User extends require('./crud')
{
    constructor()
    {
        super(db.user, 'user');
    }
};