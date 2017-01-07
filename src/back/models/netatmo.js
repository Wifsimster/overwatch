var Sequelize = require('sequelize')
var sequelize = require('../db/database')

var Netatmo = sequelize.define('netatmo', {
    client_id: Sequelize.STRING,
    client_secret: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
}, {
    freezeTableName: true,
})

module.exports = Netatmo