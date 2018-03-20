const Joi = require('joi');

const schemas = {
    'user': Joi.object().keys({
        name: Joi.string().max(50).min(1),
        email: Joi.string().email().max(50).min(1),
        timezone: Joi.string().max(3).min(1),
        validated: Joi.boolean(),
        tel: Joi.string().max(50).min(1),
    }),

    'team': Joi.object().keys({
        name: Joi.string().max(50).min(1),
        logo: Joi.string().max(50).min(1),
    }),

    'workPeriod': Joi.object().keys({
        from: Joi.string().max(50).min(1),
        to: Joi.string().max(50).min(1),
        weekDays: Joi.string().max(50).min(1),
    }),
};

exports.check = function (schema, body)
{
    if (!schemas[schema])  return {};
    return Joi.validate(body, schemas[schema], { presence: 'required' });
};