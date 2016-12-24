var Sequelize = require('sequelize')
var sequelize = require('../db/database')
var Type = require('./type')
var Location = require('./location')

const Device = sequelize.define('device', {
  name: Sequelize.STRING,
  mac: Sequelize.STRING,
  ip: Sequelize.STRING,
}, {
  freezeTableName: true,
})

Device.belongsTo(Type)
Type.hasMany(Device)

Device.belongsTo(Location)
Location.hasMany(Device)

module.exports = Device