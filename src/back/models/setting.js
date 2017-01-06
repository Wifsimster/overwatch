var Sequelize = require('sequelize')
var sequelize = require('../db/database')

var Setting = sequelize.define('setting', {
  name: Sequelize.STRING,
  value: Sequelize.STRING,
}, {
  freezeTableName: true,
})

module.exports = Setting