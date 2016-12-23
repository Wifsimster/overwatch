var Sequelize = require('sequelize');
var sequelize = require('../db/database');

var Message = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data: Sequelize.STRING
}, { freezeTableName: true });

module.exports = Message;