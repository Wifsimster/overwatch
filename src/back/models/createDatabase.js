const sequelize = require('../db/database')
const Type = require('./type')
const Location = require('./location')
const Device = require('./device')
const Message = require('./message')
const Scenario = require('./scenario')

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
    
    console.log('==== Add 10 types into DB')

    Location.create({name: 'Office'})
    Location.create({name: 'Living room'})
    Location.create({name: 'Bedroom'})
    Location.create({name: 'Kitchen'})
    Location.create({name: 'Cellar'})

    console.log('==== Add 5 locations into DB')
    
    Scenario.create({name: 'Laundry', description: 'When laundry is done, let me know', state: false})
    
    console.log('==== Add 1 scenarii into DB')

}, err => { console.error(err) })