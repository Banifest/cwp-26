const db = require('../index');
const moment = require('moment');

module.exports = class Team extends require('./crud')
{
    constructor()
    {
        super(db.team, 'team');
    }

    async bindUser(userId, teamId, body)
    {
        let user = (await db.user.findById(userId));
        let team = (await db.team.findById(teamId));
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

    async unbindUser(userId, teamId)
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

    async diffTime(teamId, firstUserId, secondUserId)
    {
        let firstPeriod = await db.workPeriod.findOne({where:{UserId: firstUserId, TeamId: teamId}});
        let secondPeriod = await db.workPeriod.findOne({where:{UserId: secondUserId, TeamId: teamId}});

        let beginFirstPeriod = moment(firstPeriod.from, "hh");
        let endFirstPeriod = moment(firstPeriod.to, "hh");
        let beginSecondPeriod = moment(secondPeriod.from, "hh");
        let endSecondPeriod = moment(secondPeriod.from, "hh");


    }
};