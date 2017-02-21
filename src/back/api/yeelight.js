const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    const yeelightSearch = new YeelightSearch()

    yeelightSearch.on('found', (fn) => {

        var lights = yeelightSearch.getYeelights()

        socket.on('get.lights', (fn) => {
            fn(lights)
        })

        lights.forEach((light) => {
            console.log('-- Id :', light.getId())
            console.log('-- Name :', light.getName())
            console.log('-- Model :', light.getModel())

            light.getValues('power').then((values) => {
                console.log('-- Values :', values)
            })

            light.turnOn('smooth', 1000)
        })

    })

}