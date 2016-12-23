var sequelize = require('../db/database');
var Type = require('./type');
var Location = require('./location');

sequelize.sync({ force: true }).then(() => {
  
    Type.create({name: 'Temperature'})
    Type.create({name: 'Humidity'})
    Type.create({name: 'Luminosity'})
    
    Location.create({name: 'Office'})
    Location.create({name: 'Living room'})
    Location.create({name: 'Bedroom'})
    Location.create({name: 'Kitchen'})
    Location.create({name: 'Cellar'})
    
    console.log('Create models into DB');
}, (err) => {
    console.error(err);
});