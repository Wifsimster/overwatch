var Sequelize = require('sequelize')
var sequelize = require('../db/database')

var Location = sequelize.define('location', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
}, { freezeTableName: true })

module.exports = Location