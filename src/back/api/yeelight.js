const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    try {
        const yeelightSearch = new YeelightSearch()
        yeelightSearch.on('found', () => {
            const lights = yeelightSearch.getYeelights()
            let object = []
            for(var i = 0; i < lights.length ; i++) {
                object.push({
                    id: lights[i].getId(),
                    model: lights[i].getModel(),
                    name: lights[i].getName()
                })
            }        
            socket.broadcast.emit('found.lights', object)
        })
    } catch(err) {
        console.error('Error: ', err)
    }

    
}