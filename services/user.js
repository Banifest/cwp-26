const db = require('../index');

module.exports = class User extends require('./crud')
{
    constructor()
    {
        super(db.user, 'user');
    }

    async validate(id, validationToken) {
        const user = await db.user.findById(id);

        if (user && user.validationToken === validationToken)
        {
            user.validated = true;
            user.save();
            return user;
        }
        else
        {
            throw this.errors.validateError;
        }
    }
};