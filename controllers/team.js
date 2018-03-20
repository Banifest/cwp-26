const sequelize = require('sequelize');

class Team extends require('./crud')
{
    constructor()
    {
        super(new (require('../services/team'))());
        this.registerRouters();
    }
}

module.exports = (settings)=>
{
    return (new Team()).router;
};