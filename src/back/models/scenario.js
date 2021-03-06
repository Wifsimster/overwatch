const Sequelize = require('sequelize')
const sequelize = require('../db/database')
const Device = require('./device')

const Scenario = sequelize.define('Scenario', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    state: Sequelize.BOOLEAN,
    if: Sequelize.STRING,
    then: Sequelize.STRING,
}, {
        freezeTableName: true,
    })

//Device.belongsToMany(Scenario)
//Scenario.hasOne(Device, {as: 'listener'})
//Scenario.hasOne(Device, {as: 'action'})

module.exports = Scenario