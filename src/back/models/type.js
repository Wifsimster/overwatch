const Sequelize = require('sequelize')
const sequelize = require('../db/database')

const Type = sequelize.define('type', {
    name: Sequelize.STRING,
    key: Sequelize.STRING,
}, {
        freezeTableName: true,
    })

module.exports = Type