var sequelize = require('../db/database')
var Type = require('./type')
var Location = require('./location')
var Device = require('./device')
var Message = require('./message')
var Setting = require('./setting')
var Netatmo = require('./netatmo')

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

    Setting.create({name: 'datetime', value: 'true'})
    Setting.create({name: 'esp8266', value: 'true'})
    Setting.create({name: 'netatmo', value: 'true'})
    Setting.create({name: 'freebox', value: 'true'})

    Netatmo.create({    
        clientId: "586274dec4978493ab8ba235",
        clientSecret: "UdxSaUVTgRNuJ6fOPKQECM9ZMzQ4X1Jxbn",
        username: "wifsimster@gmail.com",
        password: "192lucie"
    })

    console.log('Create models into DB')

}, (err) => { console.error(err) })