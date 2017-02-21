const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    const yeelightSearch = new YeelightSearch()
    var lights = []

    yeelightSearch.on('found', () => {
        console.log('Found lights !')
        lights = yeelightSearch.getYeelights()
    })

    socket.on('get.lights', (fn) => {
        console.log('Getting lights...')
        if(lights.length > 0) {
            var ids = []
            for(var i = 0 ; i < lights.length; i++) {
                ids.push(lights[i].getId())
            }
            fn(ids)
        }
        fn('No light for the moment !')
    })

    socket.on('get.light', (id) => {
        console.log('Get light by id', id)
        const light = yeelightSearch.getYeelightById(id)
        console.log('Light', light)
    })

    socket.on('set.light', (id) => {
        console.log('Set light by id', id)
        const light = yeelightSearch.getYeelightById(id)
        light.toggle().then(() => {
            console.log('Toggle !')
        }).catch((err) => {
            console.log('Error', err)
        })
    })
}