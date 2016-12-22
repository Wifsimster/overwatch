var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'overwatch', '', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: 'src/db/database.sqlite'
});

// Models
require('../models/device')(sequelize);