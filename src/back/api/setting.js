const errorHandler = require('./errorHandler')
const jsonfile = require('jsonfile')
jsonfile.spaces = 2
const file = 'config/default.json'

module.exports = (socket) => {

    socket.on('setting.getAll', () => {
        jsonfile.readFile(file, (err, obj) => {
            if(!err) {
            socket.emit('setting.getAll.result', obj.settings)
            } else {
                socket.emit('setting.getAll.error', new errorHandler(err))
            }
        })
    })

    socket.on('setting.update', (settings) => {        
        jsonfile.writeFile(file, { settings: settings })
        socket.emit('setting.update.result')
    })
}