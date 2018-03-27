const sequelize = require('sequelize');
const sendData = require('../helpers/sendData');

class Team extends require('./crud')
{
    constructor()
    {
        super(new (require('../services/team'))());

        this.addUser = async (req, res) =>
        {
            sendData(res, await this.service.bindUser(req.params.userId, req.params.teamId, req.body), req.header('accept'));
        };

        this.delUser = async (req, res) =>
        {
            sendData(res, await this.service.unbindUser(req.params.userId, req.params.teamId, req.body), req.header('accept'));
        };

        this.diffTime = async (req, res) =>
        {
            sendData(res, await this.service.diffTime(req.params.teamId, req.query.firstUserId, req.query.secondUserId),
            req.header('accept'));
        };

        this.routers['/:teamId/join-work-time'] =
            [
                {method: 'get', cb: this.diffTime}
            ];

        this.routers['/:teamId/users/:userId'] =
            [
                {method: 'post',   cb: this.addUser},
                {method: 'delete', cb: this.delUser},
            ];

        this.registerRouters();
    }
}

module.exports = (settings)=>
{
    return (new Team()).router;
};