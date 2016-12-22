var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Device = sequelize.define('device', {
    name: Sequelize.STRING,
    ip: Sequelize.STRING,
    mac: Sequelize.STRING,
  })
  }