const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function () {

    const yeelightSearch = new YeelightSearch()

    yeelightSearch.on('found', (lights) => {

        //        var lights = yeelightSearch.getYeelights()

        lights.forEach((light) => {
            console.log('-- Id :', light.getId())
            console.log('-- Name :', light.getName())
            console.log('-- Model :', light.getModel())

            light.getValues().then((values) => {
                console.log('-- Values :', values)
            })
        })

    })

}