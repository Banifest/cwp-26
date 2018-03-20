const express = require('express');

module.exports = () =>
{
    const router = express.Router();

    router.use(require('../global-contollers/logger'));
    router.use('/users',require('./user')());
    router.use('/teams', require('./team')());
    router.use('/work-periods', require('./workPeriod')());
    router.use(require('../global-contollers/error'));

    return router;
};