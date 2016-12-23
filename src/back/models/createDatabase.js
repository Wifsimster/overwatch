var sequelize = require('../db/database');
var Type = require('./type');

sequelize.sync({ force: true }).then(() => {
    Type.create({name: 'Temperature'})
    Type.create({name: 'Humidity'})
    Type.create({name: 'Luminosity'})
    console.log('Create models into DB');
}, (err) => {
    console.error(err);
});