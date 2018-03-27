const express = require('express');
const wrap = require('../helpers/wrap');
const sendData = require('../helpers/sendData');

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
        sendData(res, await this.service.readAll(), req.header('accept'));
    };
    async read(req, res)
    {
        sendData(res, await this.service.readById(req.params.id), req.header('accept'));
    };
    async paramRead(req, res)
    {
        sendData(res, await this.service.readByOption(req.body), req.header('accept'));
    };
    async create(req, res)
    {
        sendData(res, await this.service.create(req.body), req.header('accept'));
    };
    async update(req, res)
    {
        let id = req.body.id;
        delete req.body.id;
        sendData(res, await this.service.updateById(id, req.body), req.header('accept'));
    };
    async delete(req, res)
    {
        sendData(res, await this.service.deleteById(req.body.id), req.header('accept'));
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