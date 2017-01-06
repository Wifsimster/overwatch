var Sequelize = require('sequelize')
var sequelize = require('../db/database')

var Netatmo = sequelize.define('netatmo', {
    clientId: Sequelize.STRING,
    clientSecret: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
}, {
    freezeTableName: true,
})

module.exports = Netatmo