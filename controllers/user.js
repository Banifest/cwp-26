const sequelize = require('sequelize');

class User extends require('./crud')
{
    constructor()
    {
        super(new (require('../services/user'))());
        this.routers['/:userId/activation'] =
            [
                {method: 'get',   cb: this.validate},
            ];

        this.validate = this.validate.bind(this);
        this.registerRouters();
    }

    async validate(req, res)
    {

    }
}

module.exports = (settings)=>
{
    return (new User()).router;
};