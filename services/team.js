const db = require('../index');

module.exports = class Team extends require('./crud')
{
    constructor()
    {
        super(db.team, 'team');
    }
};