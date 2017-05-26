const Sequelize = require('sequelize')
const sequelize = require('../db/database')

const Message = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data: Sequelize.STRING
}, { freezeTableName: true })

module.exports = Message