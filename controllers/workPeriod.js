const sequelize = require('sequelize');

class WorkPeriod extends require('./crud')
{
    constructor()
    {
        super(new (require('../services/workPeriod'))());
        this.registerRouters();
    }
}

module.exports = (settings)=>
{
    return (new WorkPeriod()).router;
};