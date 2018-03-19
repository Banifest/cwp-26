const sequelize = require('sequelize');
const c = require('./crud');

module.exports = (settings)=>
{
    let crud = new c(new (require('../services/team'))());
    crud.registerRouters();

    return crud.router;
};