var errorHandler = require('./errorHandler')
var Setting = require('../models/setting')

module.exports = function(socket) {

    socket.on('get.setting', (fn) => {
        Setting.findAll()
            .then((settings) => { fn(settings) })
            .catch((err) => { console.error(err) })
    })

    socket.on('get.setting.object', (fn) => {
        Setting.findAll()
            .then((settings) => { 

            let rst = {}
            settings.forEach((setting, index) => {
                rst[setting.name] = (setting.value === 'true')
                if(index === settings.length - 1) { fn(rst) }
            })
        }).catch((err) => { console.error(err) })
    })

    socket.on('update.setting', (data) => {
        Setting.update({name: data.name, value: data.value}, {where: {id: data.id}})
            .then((rst) => {})
            .catch((err) => { console.error(err) })
    })

    socket.on('remove.setting', (data) => {
        Setting.destroy({ where: { id: data.id }})
            .then((rst) => {
            Setting.findAll()
                .then((settings) => { socket.emit('get.setting', settings) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })

    socket.on('removeAll.setting', () => {
        Setting.destroy({where: {}})
            .then((rst) => {
            Setting.findAll()
                .then((settings) => { socket.emit('get.setting', settings) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })

    socket.on('updateAll.setting', (settings) => {
        settings.forEach((setting, index) => {
            Setting.update({name: setting.name, value: setting.value.toString()}, { where: { id: setting.id}}).then((count, row) => {
                if(index = settings.length - 1) {
                    Setting.findAll()
                        .then((settings) => { socket.emit('get.setting', settings) })
                        .catch((err) => { console.error(err) })
                }
            })
                .catch((err) => { console.error(err) })
        })
    })
}