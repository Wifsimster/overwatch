const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    const yeelightSearch = new YeelightSearch()

    yeelightSearch.on('found', () => {

        var lights = yeelightSearch.getYeelights()

        lights.forEach((light) => {
            console.log('-- Id :', light.getId())
            console.log('-- Name :', light.getName())
            console.log('-- Model :', light.getModel())

            light.turnOn('smooth', 500)
        })
        
        socket.emit('get.lights', (fn) => {
            fn(lights)
        })
    })
}