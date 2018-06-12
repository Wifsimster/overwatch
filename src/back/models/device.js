const Sequelize = require('sequelize')
const sequelize = require('../db/database')
const Type = require('./type')
const Location = require('./location')
const Message = require('./message')

const Device = sequelize.define('device', {
    mac: Sequelize.STRING,
    name: Sequelize.STRING,
    ip: Sequelize.STRING,
}, {
        freezeTableName: true,
    })

Device.belongsToMany(Type, { through: 'DeviceType' })
Type.belongsToMany(Device, { through: 'DeviceType' })

Device.belongsTo(Location)
Location.hasMany(Device)

Device.hasMany(Message)
Message.belongsTo(Device)

module.exports = Device