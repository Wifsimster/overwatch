var sequelize = require('../db/database')
var Type = require('./type')
var Location = require('./location')
var Device = require('./device')
var Message = require('./message')

sequelize.sync({ force: true }).then(() => {

    Type.create({name: 'Temperature', key: 'temperature'})
    Type.create({name: 'Humidity', key: 'humidity'})
    Type.create({name: 'Luminosity', key: 'luminosity'})
    Type.create({name: 'Pressure', key: 'pressure'})
    Type.create({name: 'Switch', key: 'switch'})
    Type.create({name: 'Dimmer', key: 'dimmer'})
    Type.create({name: 'Gas', key: 'gas'})
    Type.create({name: 'Water', key: 'water'})
    Type.create({name: 'RGBW', key: 'rgbw'})
    Type.create({name: 'Motion', key: 'motion'})

    Location.create({name: 'Office'})
    Location.create({name: 'Living room'})
    Location.create({name: 'Bedroom'})
    Location.create({name: 'Kitchen'})
    Location.create({name: 'Cellar'})

    console.log('Create models into DB')

}, (err) => { console.error(err) })