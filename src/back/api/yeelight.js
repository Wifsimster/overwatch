const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    const yeelightSearch = new YeelightSearch()

    socket.on('get.lights', (fn) => {
        yeelightSearch.on('found', () => {

            var lights = yeelightSearch.getYeelights()
            var ids = []
            
            console.log('Get lights...')

            for(var i = 0 ; i < lights.length; i++) {
                //console.log('-- Id :', light.getId())
                //                console.log('-- Name :', light.getName())
                //                console.log('-- Model :', light.getModel())
                ids.push(lights[i].getId())
            }
            
            console.log('IDS', ids)
            
            fn(ids)
        })
    })
}