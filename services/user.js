const db = require('../index');

module.exports = class User extends require('./crud')
{
    constructor()
    {
        super(db.user, 'user');
    }

    async bindTeam(userId, teamId, body)
    {
        let user = (await db.user.findById(userId));
        let team = (await db.team.findById(teamId));
        //user.Team = team;
        //team.User = user;
        if(user && team)
        {
            body['UserId'] = user.id.toString();
            body['TeamId'] = team.id.toString();
            return db.workPeriod.create(body)
        }
        else
        {
            throw this.errors.notFound;
        }
    };

    async unbindTeam(userId, teamId)
    {
        let workPeriod = await db.workPeriod.findOne({where:{UserId: userId, TeamId: teamId}});
        if(workPeriod)
        {
            return workPeriod.destroy();
        }
        else
        {
            throw this.errors.notFound;
        }
    }
};