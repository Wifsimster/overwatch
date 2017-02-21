const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    const yeelightSearch = new YeelightSearch()
    var lights = []

    socket.on('get.lights', (fn) => {
        console.log('Get lights...')
        yeelightSearch.on('found', () => {
            lights = yeelightSearch.getYeelights()

            var ids = []
            for(var i = 0 ; i < lights.length; i++) {
                //console.log('-- Id :', light.getId())
                //                console.log('-- Name :', light.getName())
                //                console.log('-- Model :', light.getModel())
                ids.push(lights[i].getId())
            }
            fn(ids)
        })
    })

    socket.on('get.light', (id) => {
        console.log('Get light by id', id)
    })
}