const sequelize = require('sequelize');
const c = require('./crud');

module.exports = (settings)=>
{
    let crud = new c(new (require('../services/workPeriod'))());
    crud.registerRouters();

    return crud.router;
};