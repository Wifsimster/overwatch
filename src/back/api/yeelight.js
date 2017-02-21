const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    const yeelightSearch = new YeelightSearch()
    var lights = []

    yeelightSearch.on('found', () => {
        console.log('Found lights !')
        lights = yeelightSearch.getYeelights()

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

    socket.on('get.light', (id, fn) => {
        const light = yeelightSearch.getYeelightById(id)
        light.getValues(['power', 'bright']).then((values) => {          
            fn(values)  
        }).catch((err) => {
            fn(err)
        })
    })

    socket.on('toggle.light', (id) => {
        console.log('Set light by id', id)
        const light = yeelightSearch.getYeelightById(id)
        light.toggle().then((rst) => {
            fn(rst)
        }).catch((err) => { fn(err) })
    })

    socket.on('set.light.name', (options, fn) => {
        const light = yeelightSearch.getYeelightById(options.id)
        light.setName(options.name).then((rst) => {
            fn(rst)
        }).catch((err) => { fn(err) })
    })
}