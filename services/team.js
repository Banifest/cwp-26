const db = require('../index');
const moment = require('moment');

module.exports = class Team extends require('./crud')
{
    constructor()
    {
        super(db.team, 'team');

        this.parent = new (require('./crud'))();

        this.readById = async (id) =>
        {
            if (!isNaN(id) && (await this.model.findById(Number(id))) != null)
            {
                let team = (await this.model.findById(Number(id))).get({plain: true});
                let users = await db.workPeriod.findAll();
                team.users = [];
                for(let iter of users)
                {
                    if (iter.TeamId === team.id)
                    {
                        team.users.push(await iter.get({plain: true}));
                    }
                }
                return team;
            }
            else
            {
                throw this.errors.notFound;
            }
        };
    }



    async bindUser(userId, teamId, body)
    {
        let user = (await db.user.findById(userId));
        let team = (await db.team.findById(teamId));
        if(user && team && user.validate)
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
        let answ = 0;

        let firstUser = await db.user.findById(firstUserId);
        let secondUser = await db.user.findById(secondUserId);

        let firstPeriod = await db.workPeriod.findOne({where:{UserId: firstUserId, TeamId: teamId}});
        let secondPeriod = await db.workPeriod.findOne({where:{UserId: secondUserId, TeamId: teamId}});

        let firstDays = new Set(firstPeriod.weekDays.toString().split(','));
        let commonDays = new Set(secondPeriod.weekDays.toString().split(',').filter(x => firstDays.has(x)));

        let momentTz = moment().tz(firstUser.timezone);

        let beginFirstPeriod = moment(firstPeriod.from, "hh").hour();//.tz(momentTz)
        let endFirstPeriod = moment(firstPeriod.to, "hh").hour();//.tz(momentTz)
        let beginSecondPeriod = moment(secondPeriod.from, "hh").hour();//.tz(momentTz)
        let endSecondPeriod = moment(secondPeriod.from, "hh").hour();//.tz(momentTz)
        let maxBegin = Math.max(beginFirstPeriod, beginSecondPeriod);
        let minEnd = Math.min(endFirstPeriod, endSecondPeriod);

        answ = commonDays.length * minEnd - maxBegin;

        return answ;
    }
};