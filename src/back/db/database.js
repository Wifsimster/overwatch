const Sequelize = require('sequelize')
const config = require('../../../config')
const db = config.database

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'sqlite',
    storage: './src/back/db/database.sqlite',
    logging: false,
    operatorsAliases: false
})

module.exports = sequelize