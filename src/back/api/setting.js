const errorHandler = require('./errorHandler')
const Setting = require('../models/setting')
const jsonfile = require('jsonfile')
jsonfile.spaces = 2
const file = 'config/default.json'

module.exports = (socket) => {

    socket.on('get.setting', (fn) => {
        jsonfile.readFile(file, (err, obj) => { fn(obj.settings) })
    })

    socket.on('updateAll.setting', (settings) => {        
        jsonfile.writeFile(file, { settings: settings })
    })
}