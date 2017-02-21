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
                name: lights[i].getName(),
                values: lights[i].getValues(['power', 'bright'])
            })
        }        
        socket.broadcast.emit('found.lights', object)
    })

    socket.on('get.light', (id, fn) => {
        console.log('Get light by id', id)
        const light = yeelightSearch.getYeelightById(id)
        fn({
            model: light.getModel(),
            id: light.getId(),
            name: light.getName(),
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