module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Team', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50)},
        logo: {type: Sequelize.STRING(50)},
    });
};