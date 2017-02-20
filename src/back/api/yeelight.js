const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function () {

    const yeelightSearch = new YeelightSearch()

    yeelightSearch.on('found', (Yeelight) => {

        console.log('Yeelight:', Yeelight)

        var lights = yeelightSearch.getYeelights()
        
        console.log('Lights', lights)
        
    })

}