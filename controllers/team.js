const sequelize = require('sequelize');

class Team extends require('./crud')
{
    constructor()
    {
        super(new (require('../services/team'))());

        this.routers['/:teamId/join-work-time'] =
            [
                {method: 'get', cb: this.diffTime}
            ];

        this.routers['/:teamId/users/:userId'] =
            [
                {method: 'post',   cb: this.addUser},
                {method: 'delete', cb: this.delUser},
            ];
        this.addUser = this.addUser.bind(this);
        this.delUser = this.delUser.bind(this);
        this.diffTime = this.diffTime.bind(this);

        this.registerRouters();
    }


    async addUser(req, res)
    {
        res.send(await this.service.bindUser(req.params.userId, req.params.teamId, req.body));
    };

    async delUser(req, res)
    {
        res.send(await this.service.unbindUser(req.params.userId, req.params.teamId, req.body));
    };

    async diffTime(req, res)
    {
        res.send(await this.service.diffTime(req.param.teamId, req.query.firstUserId, req.query.secondUserId));
    }
}

module.exports = (settings)=>
{
    return (new Team()).router;
};