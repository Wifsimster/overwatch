const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = class Light {

    getName(id) {
        switch (id) {
            case '0x00000000033601d3':
                return "Salon"
                break;
            case '0x0000000003360d2c':
                return "Couloir"
                break;
            case '0x0000000003312a03':
                return "Bureau"
                break;
            case '0x000000000335ff81':
                return 'Chambre'
                break;
            case '0x000000000335f9ce':
                return 'Cuisine'
                break;
            default:
                return "Unknown"
        }
    }

    getAll() {
        const lights = yeelightSearch.getYeelights()
        let list = []
        lights.map((light) => {
            list.push({
                id: light.id,
                name: this.getName(light.id),
                model: light.model,
                port: light.port,
                hostname: light.hostname,
                supports: light.supports,
            })
        })
        return list
    }

    turnOn(id) {
        const light = yeelightSearch.getYeelightById(id)
        if (light) { return light.turnOn() }
    }

    turnOff(id) {
        const light = yeelightSearch.getYeelightById(id)
        if (light) { return light.turnOff() }
    }

    toggle(id) {
        const light = yeelightSearch.getYeelightById(id)
        if (light) { return light.toggle() }
    }

    getValues(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) {
            return light.getValues(options.props)
        }
    }

    setName(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.setName(options.name) }
    }

    setColorTemperature(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.setColorTemperature(options.temperature) }
    }

    setBrightness(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.setBrightness(options.brightness) }
    }

    setRGB(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.setRGB(options.hex) }
    }

    setHSV(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.setHSV(options.hue, options.staturation) }
    }

    getCron(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.getCron(options.type, options.index) }
    }

    addCron(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.addCron(options.type, options.value) }
    }

    deleteCron(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.deleteCron(options.type, options.index) }
    }

    startColorFlow(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.startColorFlow(options.count, options.action, options.flowExpression) }
    }

    stopColorFlow(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.stopColorFlow() }
    }

    setAdjust(options) {
        const light = yeelightSearch.getYeelightById(options.id)
        if (light) { return light.setAdjust(options.action, options.prop) }
    }
}






