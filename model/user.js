module.exports = (Sequelize, sequelize) => {
    return sequelize.define('User', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50)},
        email: {type: Sequelize.STRING(50)},
        timezone: {type: Sequelize.STRING(3)},
        validated: {type: Sequelize.BOOLEAN},
        tel: {type: Sequelize.STRING(50)},
    });
};