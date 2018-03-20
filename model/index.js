const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

module.exports = (Sequelize, config)=>
{
    const sequelize = new Sequelize('database', 'username', '',
        {
            host: 'localhost',
            dialect: 'sqlite',
            storage: './dataBase',
            define: {
                timestamps: false,
                paranoid: true
            }
        });

    const workPeriod = require('./workperiod')(Sequelize, sequelize);
    const user = require('./user')(Sequelize, sequelize);
    const team = require('./team')(Sequelize, sequelize);

    user.belongsToMany(team, {through: workPeriod});
    team.belongsToMany(user, {through: workPeriod});


    return {
        workPeriod,
        user,
        team,
        sequelize: sequelize,
        Sequelize: Sequelize
    };
};