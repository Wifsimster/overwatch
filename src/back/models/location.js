var Sequelize = require('sequelize')
var sequelize = require('../db/database')

var Location = sequelize.define('location', {
  name: Sequelize.STRING,
}, {
  freezeTableName: true,
})

module.exports = Location