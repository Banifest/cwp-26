const sequelize = require('sequelize');
const sendData = require('../helpers/sendData');

class User extends require('./crud')
{
    constructor()
    {
        super(new (require('../services/user'))());

        this.validate = async (req, res) =>
        {
            sendData(res, await this.service.validate(req.params.userId, req.query.validateToken, req.header('accept')));
        };

        this.routers['/:userId/validate'] =
            [
                {method: 'get',   cb: this.validate},
            ];
        this.registerRouters();
    }
}

module.exports = (settings)=>
{
    return (new User()).router;
};