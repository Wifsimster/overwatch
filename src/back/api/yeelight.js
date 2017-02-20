const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = function () {

    console.log('Yeelight')

    yeelightSearch.on('found', (lightBulb) => {
        
        console.log('Found:', lightBulb)
        
        lightBulb.toggle().then(() => {
            console.log('toggled')
        }).catch((err) => {
            console.log(`received some error: ${err}`)
        })
    })

}