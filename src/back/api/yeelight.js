const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = function () {

    console.log('Yeelight')

    var lights = yeelightSearch.getYeelights()
    
    console.log('Lights', lights)

}