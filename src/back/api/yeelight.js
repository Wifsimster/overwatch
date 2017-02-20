const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function () {

    const yeelightSearch = new YeelightSearch()
    
    console.log('Yeelight')

    var lights = yeelightSearch.getYeelights()

    console.log('Lights', lights)

    yeelightSearch.on('found', (lightBulb) => {

        console.log('Found:', lightBulb)
    })

}