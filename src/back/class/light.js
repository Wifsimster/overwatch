const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = class Light {

    getAll(id) {
        const lights = yeelightSearch.getYeelights()
        let list = []
        lights.map((light) => {
            list.push({
                id: light.getId(),
                model: light.getModel(),
                name: light.getName()
            })
        })
        return list
    }

    getValues(id) {
        const light = yeelightSearch.getYeelightById(id)
        if(light) { return light.getValues(["power", "bright"]) }
    }

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

    setName(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) { return light.setName(options.name) }
    }

    setColorTemperature(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) { return light.setColorTemperature(options.temperature) }
    }

    setBrightness(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) { return light.setBrightness(options.brightness) }
    }

    setRGB(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) { return light.setRGB(options.hex) }
    }

    setHSV(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) { return light.setHSV(options.hue, options.staturation) }
    }
}