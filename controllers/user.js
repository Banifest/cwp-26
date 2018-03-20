const sequelize = require('sequelize');

class User extends require('./crud')
{
    constructor()
    {
        super(new (require('../services/user'))());
        this.addTeam = this.addTeam.bind(this);
        this.delTeam = this.delTeam.bind(this);

        this.routers['/:id/teams/:teamId'] =
            [
                {method: 'post', cb: this.addTeam},
                {method: 'delete', cb: this.delTeam},
            ];

        this.registerRouters();
    }

    async addTeam(req, res)
    {
        let answ = await this.service.bindTeam(req.params.id, req.params.teamId, req.body);
        res.send(answ);
    };

    async delTeam(req, res)
    {
        let answ = await this.service.unbindTeam(req.params.id, req.params.teamId, req.body);
        res.send(answ);
    };
}

module.exports = (settings)=>
{
    return (new User()).router;
};