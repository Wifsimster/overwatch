var sequelize = require('../db/database')
var Type = require('./type')
var Location = require('./location')
var Device = require('./device')
var Message = require('./message')

sequelize.sync({ force: true }).then(() => {

    Type.create({name: 'Temperature'})
    Type.create({name: 'Humidity'})
    Type.create({name: 'Luminosity'})
    Type.create({name: 'Pressure'})
    Type.create({name: 'Switch'})
    Type.create({name: 'Dimmer'})
    Type.create({name: 'Gas'})
    Type.create({name: 'Water'})
    Type.create({name: 'RGBW'})

    Location.create({name: 'Office'})
    Location.create({name: 'Living room'})
    Location.create({name: 'Bedroom'})
    Location.create({name: 'Kitchen'})
    Location.create({name: 'Cellar'})

    console.log('Create models into DB')

}, (err) => { console.error(err) })