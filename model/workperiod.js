module.exports = (Sequelize, sequelize) => {
    return sequelize.define('WorkPeriod', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        from: {type: Sequelize.STRING(50)},
        to: {type: Sequelize.STRING(50)},
        weekDays: {type: Sequelize.STRING(50)},
    });
};