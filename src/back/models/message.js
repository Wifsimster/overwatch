var Sequelize = require('sequelize');
var sequelize = require('../db/db');

var Message = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    mac: Sequelize.STRING,
    ip: Sequelize.STRING,

}, { freezeTableName: true });

module.exports = Message;