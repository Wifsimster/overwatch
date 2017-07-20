const Sequelize = require('sequelize')
const sequelize = require('../db/database')

const Location = sequelize.define('location', {
  name: Sequelize.STRING,
}, {
    freezeTableName: true,
  })

module.exports = Location