const db = require('../index');

module.exports = class WorkPeriod extends require('./crud')
{
    constructor()
    {
        super(db.workPeriod, 'workPeriod');
    }
};