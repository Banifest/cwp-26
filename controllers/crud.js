const express = require('express');
const wrap = require('../helpers/wrap');

module.exports = class Crud
{
    constructor(service)
    {
        this.service = service;
        this.readAll = this.readAll.bind(this);
        this.read = this.read.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.router = express.Router();
        this.routers = {
            '/':
                [
                    { method: 'get', cb: this.readAll },
                    { method: 'post', cb: this.create }
                ],
            '/:id':
                [
                    { method: 'get', cb: this.read },
                    { method: 'put', cb: this.update },
                    { method: 'delete', cb: this.delete }
                ]
        }
    }
    async readAll(req, res)
    {
        let answ = await this.service.readAll();
        res.json(answ);
    };
    async read(req, res)
    {
        let answ = await this.service.readById(req.params.id);
        this.cache.set(req, answ);
        res.json(answ);
    };
    async paramRead(req, res)
    {
        res.json(await this.service.readByOption(req.body));
    };
    async create(req, res)
    {
        res.json(await this.service.create(req.body));
    };
    async update(req, res)
    {
        let id = req.body.id;
        delete req.body.id;
        res.json(await this.service.updateById(id, req.body));
    };
    async delete(req, res)
    {
        res.json(await this.service.deleteById(req.body.id));
    };
    registerRouters()
    {
        Object.keys(this.routers).forEach(route =>
        {
            let handlers = this.routers[route];

            if (!handlers || !Array.isArray(handlers))
            {
                return;
            }
            for (let handler of handlers)
            {
                this.router[handler.method](route, wrap(handler.cb));
            }
        });
    };
};