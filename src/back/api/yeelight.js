const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    const yeelightSearch = new YeelightSearch()
    var lights = []

    socket.on('get.lights', (fn) => {
        console.log('Get lights...')
        yeelightSearch.on('found', () => {
            console.log('Found lights !')
            lights = yeelightSearch.getYeelights()

            var ids = []
            for(var i = 0 ; i < lights.length; i++) {
                //console.log('-- Id :', light.getId())
                //                console.log('-- Name :', light.getName())
                //                console.log('-- Model :', light.getModel())
                ids.push(lights[i].getId())
            }
        })
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