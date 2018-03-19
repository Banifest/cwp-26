const config = require('./config.json');
const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require("body-parser");

const db = require('./model')(sequelize, config);

module.exports = db;

async function main()
{
    const app = express();

    db.sequelize.sync({force: false});

    app.use(bodyParser.json());

    app.use('/api', require('./controllers/api')());

    app.listen(3000, () =>
    {
        console.log('Example app listening on port 3000!');
    });

   // console.log(app);
}
main();