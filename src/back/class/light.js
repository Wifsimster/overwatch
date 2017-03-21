const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = class Light {
    turnOn(id) {
        const light = yeelightSearch.getYeelightById(id)
        if(light) { return light.turnOn() }
    }
        
    turnOff(id) {
        const light = yeelightSearch.getYeelightById(id)
        if(light) { return light.turnOff() }
    }
        
    toggle(id) {
        const light = yeelightSearch.getYeelightById(id)
        if(light) { return light.toggle() }
    }
}