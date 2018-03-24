const sequelize = require('sequelize');

class WorkPeriod extends require('./crud')
{
    constructor()
    {
        super(new (require('../services/workPeriod'))());
        this.routers = {
            '/':
            [
                { method: 'get', cb: this.readAll },
            ],
            '/teams/:teamId/users/:userId':
            [
                { method: 'post', cb: this.create }
            ],
            '/:id':
            [
                { method: 'get', cb: this.read },
                { method: 'put', cb: this.update },
                { method: 'delete', cb: this.delete }
            ]
        };
        this.registerRouters();
    }
}

module.exports = (settings)=>
{
    return (new WorkPeriod()).router;
};