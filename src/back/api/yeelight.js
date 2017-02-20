const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = function () {

    console.log('Yeelight')

    yeelightSearch.getYeelights().then((lights) => {
        console.log('Lights', lights)  
    })

}