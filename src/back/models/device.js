var Sequelize = require('sequelize');
var sequelize = require('../../db');

var Device = sequelize.define('device', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    mac: Sequelize.STRING,
    ip: Sequelize.STRING,

}, { freezeTableName: true });

module.exports = Device;