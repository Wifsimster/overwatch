var Sequelize = require('sequelize')
var sequelize = require('../db/database')

var Type = sequelize.define('type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
}, { freezeTableName: true })

module.exports = Type